import React, { useEffect, useRef, useState } from 'react';
import { SortIcon, SortClockIcon } from '../../icons';
import styled from 'styled-components';
import { styles } from './SortBy.styles';
import { Title, placeholder, primaryButton, transparent } from 'src/theme';
import { Button } from '../button';
import { SORT_BY } from 'src/constants';

const Container = styled.div`
  ${styles.container}
`;

const LeftMenu = styled.div`
  ${styles.leftMenu}
`;

const SortTitle = styled.div`
  ${styles.sortTitle}
`;

const geSortTitle = (sortType: string) =>
  sortType === SORT_BY.NONE ? (
    <SortIcon width={20} />
  ) : sortType === SORT_BY.NEWEST ? (
    <SortClockIcon width={20} fill={primaryButton} />
  ) : (
    <SortClockIcon width={20} fill={primaryButton} style={{ transform: 'rotate(180deg)' }} />
  );

export const SortBy = ({ handleSort, sortType }: { handleSort: (value: string) => void; sortType: string }) => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
        setShowLeftMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Container>
      <div ref={ref}>
        <Button
          handleButton={() => {
            setShowLeftMenu(!showLeftMenu);
          }}
          testId='sort-by-button'
          buttonType='secondary'
          styles={{
            borderRadius: 4,
            padding: '0px 12px',
            minHeight: 36
          }}
        >
          {geSortTitle(sortType)}
        </Button>
        {showLeftMenu ? (
          <LeftMenu>
            <Button
              handleButton={() => {
                setShowLeftMenu(false);
                handleSort(SORT_BY.NONE);
              }}
              styles={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                backgroundColor: transparent,
                borderBottom: `1px solid ${placeholder}`,
                borderRadius: 0,
                width: '100%'
              }}
            >
              <SortTitle>
                <SortIcon width={20} fill={primaryButton} />
                <Title style={{ textDecoration: 'none' }}>None</Title>
              </SortTitle>
            </Button>
            <Button
              handleButton={() => {
                setShowLeftMenu(false);
                handleSort(SORT_BY.NEWEST);
              }}
              styles={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                backgroundColor: transparent,
                borderBottom: `1px solid ${placeholder}`,
                borderRadius: 0,
                width: '100%'
              }}
            >
              <SortTitle>
                <SortClockIcon width={20} fill={primaryButton} />
                <Title style={{ textDecoration: 'none' }}>Newest</Title>
              </SortTitle>
            </Button>
            <Button
              handleButton={() => {
                setShowLeftMenu(false);
                handleSort(SORT_BY.OLDEST);
              }}
              styles={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                backgroundColor: transparent,
                borderRadius: 0,
                width: '100%'
              }}
            >
              <SortTitle>
                <SortClockIcon width={20} fill={primaryButton} style={{ transform: 'rotate(180deg)' }} />
                <Title style={{ textDecoration: 'none' }}>Oldest</Title>
              </SortTitle>
            </Button>
          </LeftMenu>
        ) : null}
      </div>
    </Container>
  );
};

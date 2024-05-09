import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { HomeIcon, AccountIcon, SignOutIcon, ChangePassIcon } from '../../icons';
import styled from 'styled-components';
import { styles } from './Header.styles';
import { Title, placeholder, secondary, transparent } from 'src/theme';
import { Button } from '../button';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  ${styles.container}
`;

const LeftHeader = styled.div`
  ${styles.leftHeader}
`;

const LeftMenu = styled.div`
  ${styles.leftMenu}
`;

const AccountTitle = styled.div`
  ${styles.accountTitle}
`;

export const Header = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const ref = useRef(null);

  const handleToProfile = () => {
    setShowLeftMenu(false);
    router.push('/update-profile');
  };

  const handleToChangePassword = () => {
    setShowLeftMenu(false);
    router.push('/change-password');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/sign-in');
    } catch {
      console.log('Failed to log out');
    }
    setShowLeftMenu(false);
  };

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
    <>
      <Container>
        <Link href='/' className=''>
          <HomeIcon fill={secondary} />
        </Link>
        <LeftHeader>
          <Title style={{ color: secondary }}>Hi {currentUser.displayName}</Title>

          <div ref={ref}>
            <Button
              handleButton={() => {
                setShowLeftMenu(!showLeftMenu);
              }}
              styles={{ backgroundColor: 'transparent' }}
            >
              <AccountIcon fill={secondary} />
            </Button>
            {showLeftMenu ? (
              <LeftMenu>
                <Button
                  handleButton={handleToProfile}
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
                  <AccountTitle>
                    <AccountIcon width={20} fill={secondary} />
                    <Title style={{ textDecoration: 'none' }}>Profile</Title>
                  </AccountTitle>
                </Button>
                <Button
                  handleButton={handleToChangePassword}
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
                  <AccountTitle>
                    <ChangePassIcon width={18} fill={secondary} />
                    <Title style={{ textDecoration: 'none' }}>Change password</Title>
                  </AccountTitle>
                </Button>
                <Button
                  handleButton={handleLogout}
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
                  <AccountTitle>
                    <SignOutIcon width={20} fill={secondary} />
                    <Title style={{ textDecoration: 'none' }}>Sign out</Title>
                  </AccountTitle>
                </Button>
              </LeftMenu>
            ) : null}
          </div>
        </LeftHeader>
      </Container>
    </>
  );
};

import React from 'react';
import { SearchIcon } from 'src/icons';
import styled from 'styled-components';
import { styles } from './Search.styles';

const Container = styled.div`
  ${styles.Container}
`;

const InputStyled = styled.input`
  ${styles.input}
`;

export const Search = ({
  searchString,
  handleSearch
}: {
  searchString: string;
  handleSearch: (value: string) => void;
}) => {
  return (
    <form>
      <Container>
        <SearchIcon width={18} height={18} />
        <InputStyled
          type='text'
          placeholder='Search...'
          value={searchString}
          onChange={e => {
            e.preventDefault();
            handleSearch(e.target.value);
          }}
        />
      </Container>
    </form>
  );
};

import React from 'react';
import styled from 'styled-components';
import { styles } from './TitleItem.styles';
import { Title } from 'src/components';

const Container = styled.div`
  ${styles.container}
`;

const Count = styled.div`
  ${styles.count}
`;

export const TitleItem = ({ title, count, color }: { title: string; color: string; count: number }) => {
  return (
    <Container color={color}>
      <Title style={{ color: color, fontWeight: 500 }}>{title}</Title>
      <Count color={color}>{count}</Count>
    </Container>
  );
};

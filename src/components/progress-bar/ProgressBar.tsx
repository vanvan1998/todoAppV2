import React from 'react';
import styled from 'styled-components';
import { styles } from './ProgressBar.styles';
import { Title } from 'src/theme';

const Container = styled.div`
  ${styles.container}
`;

const Wrapper = styled.div`
  ${styles.wrapper}
`;

const Count = styled.div`
  ${styles.count}
`;

const ProgressBorder = styled.div<{ color: string }>`
  ${styles.progressBorder}
`;

const Progress = styled.div<{ color: string; count: number }>`
  ${styles.progress}
`;

export const ProgressBar = ({ count, color }: { color: string; count: number }) => {
  return (
    <Container>
      <Wrapper>
        <Title style={{ color: color }}>Progress</Title>
        <Count color={color}>{count}%</Count>
      </Wrapper>
      <ProgressBorder color={color}>
        <Progress count={count} color={color} />
      </ProgressBorder>
    </Container>
  );
};

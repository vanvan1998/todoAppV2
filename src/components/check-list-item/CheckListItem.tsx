import React from 'react';
import styled from 'styled-components';
import { styles } from './CheckListItem.styles';
import { Title, placeholder } from 'src/theme';
import { ClosedIcon, DeleteIcon, DoneIcon, PendingIcon } from 'src/icons';

const Container = styled.div`
  ${styles.container}
`;

const Wrapper = styled.div`
  ${styles.wrapper}
`;

interface CheckListItemProps {
  title: string;
  color: string;
  isChecked: boolean;
  handleCompleted: () => void;
  handleDelete: () => void;
}

export const CheckListItem = ({ title, isChecked, color, handleCompleted, handleDelete }: CheckListItemProps) => {
  return (
    <Container color={color}>
      {isChecked ? (
        <DoneIcon fill={color} width={18} onClick={handleCompleted} />
      ) : (
        <PendingIcon color={color} height={18} onClick={handleCompleted} />
      )}
      <Wrapper>
        <Title>{title}</Title>
        <ClosedIcon fill={`${color}99`} width={18} onClick={handleDelete} />
      </Wrapper>
    </Container>
  );
};

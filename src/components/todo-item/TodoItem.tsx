import React, { useState } from 'react';
import styled from 'styled-components';
import { styles } from './TodoItem.styles';
import { SubTitle, Title, placeholder, primaryButton } from 'src/theme';
import { Modal } from 'react-bootstrap';
import { TodoItemType } from '../../types';
import { DeleteIcon, EditIcon } from '../../icons';
import { isEmpty } from 'lodash';
import { AddTodo } from '../addTodo';
import { MODE } from 'src/constants';
import { Button } from '../button';

const Container = styled.div`
  ${styles.container}
`;

const ActionWrapper = styled.div`
  ${styles.actionWrapper}
`;

const RightAction = styled.div`
  ${styles.rightAction}
`;

interface TodoItemProps {
  todo: TodoItemType;
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
}

export const TodoItem = ({ todo, handleCompleteTodo, handleDeleteTodo, handleUpdateTodo }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const newDetail = !isEmpty(todo.detail) && todo.detail.length > 160 ? `${todo.detail.slice(0, 160)}...` : todo.detail;

  return (
    <Container>
      <Title style={{ fontWeight: 500, paddingBottom: 6 }}>{todo.title}</Title>
      <SubTitle style={{ height: 70, width: '100%' }}>{newDetail}</SubTitle>
      <ActionWrapper>
        <Button
          handleButton={() => handleCompleteTodo(todo)}
          styles={{
            minHeight: 26,
            height: 26,
            padding: '0 16px',
            ...(todo.completed
              ? {
                  backgroundColor: 'transparent',
                  borderRadius: 4,
                  border: `1px solid ${placeholder}`,
                  color: primaryButton
                }
              : {})
          }}
        >
          {todo.completed ? 'Reopen' : 'Done'}
        </Button>
        <RightAction>
          <Button
            handleButton={() => {
              if (isEdit) {
                setIsEdit(false);
              } else {
                setIsEdit(true);
              }
            }}
            styles={{
              backgroundColor: 'white',
              padding: '0 8px',
              border: '1px solid #858585',
              minHeight: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <EditIcon color='black' width={16} height={16} />
          </Button>
          <Button
            handleButton={() => handleDeleteTodo(todo.id)}
            styles={{
              backgroundColor: 'white',
              padding: '0 8px',
              border: '1px solid #858585',
              minHeight: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <DeleteIcon color='black' width={16} height={16} />
          </Button>
        </RightAction>
      </ActionWrapper>

      <Modal
        style={{
          width: '100%',
          height: '100vh',
          paddingTop: 20
        }}
        show={isEdit}
        onHide={handleCloseEdit}
      >
        <AddTodo mode={MODE.UPDATE} updateItem={handleUpdateTodo} onComplete={handleCloseEdit} todo={todo} />
      </Modal>
    </Container>
  );
};

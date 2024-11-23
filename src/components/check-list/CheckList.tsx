import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Title } from 'src/components';
import styled from 'styled-components';
import { AddIcon } from '../../icons';
import { CategoryType, TodoItemType } from '../../types';
import { CheckListItem } from '../check-list-item';
import { categoryData } from '../todo-detail-item';
import { styles } from './CheckList.styles';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const InputWrapper = styled.div`
  ${styles.inputWrapper}
`;

const InputStyled = styled.input`
  ${styles.input}
`;

interface CheckListProps {
  todo: TodoItemType;
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
  isMobile: boolean;
}

export const CheckList = ({ todo, handleUpdateTodo, isMobile }: CheckListProps) => {
  const [newItem, setNewItem] = useState('');
  const checkList = todo.checkList || [];

  const handleAddCheckList = async () => {
    if (!isEmpty(newItem)) {
      setNewItem('');
      await handleUpdateTodo({
        todo,
        fieldsToUpdate: {
          checkList: [...checkList, { title: newItem, completed: false }]
        }
      });
    }
  };
  const handleCompleted = async (index: number) => {
    checkList[index].completed = !checkList[index].completed;
    await handleUpdateTodo({
      todo,
      fieldsToUpdate: {
        checkList: [...checkList]
      }
    });
  };

  const handleDelete = async (index: number) => {
    await handleUpdateTodo({
      todo,
      fieldsToUpdate: {
        checkList: [...checkList.filter((_, i) => i !== index)]
      }
    });
  };

  const color = categoryData[todo.category as CategoryType].color;
  return (
    <Container isMobile={isMobile}>
      <Title style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 6 }}>Check List</Title>
      {checkList.map((item, index) => (
        <CheckListItem
          key={index}
          title={item.title}
          isChecked={item.completed}
          color={color}
          handleCompleted={() => {
            handleCompleted(index);
          }}
          handleDelete={() => {
            handleDelete(index);
          }}
        />
      ))}
      <InputWrapper>
        <InputStyled
          type='text'
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder='Enter new task todo...'
        />
        <AddIcon
          width={20}
          height={20}
          color={isEmpty(newItem) ? `${color}70` : color}
          style={{ cursor: isEmpty(newItem) ? 'not-allowed' : 'pointer' }}
          onClick={handleAddCheckList}
        />
      </InputWrapper>
    </Container>
  );
};

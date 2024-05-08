import React from 'react';
import styled from 'styled-components';
import { styles } from './TodoList.styles';
import { TodoItemType } from 'src/types';
import { TodoItem } from '../todo-item';

const Container = styled.div`
  ${styles.container}
`;
interface TodoListProps {
  todoList: TodoItemType[];
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
}

export const TodoList = ({ todoList, handleCompleteTodo, handleDeleteTodo, handleUpdateTodo }: TodoListProps) => {
  return (
    <Container>
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
    </Container>
  );
};

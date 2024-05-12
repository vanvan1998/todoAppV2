import React from 'react';
import styled from 'styled-components';
import { styles } from './TodoList.styles';
import { TodoItemType } from 'src/types';
import { TodoItem } from '../todo-item';
import { AddTodoModal } from '../add-todo-modal';

const Container = styled.div`
  ${styles.container}
`;
interface TodoListProps {
  todoListCategoryType: number;
  todoList: TodoItemType[];
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleAddTodoItem: (arg: any) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
  onDragStart: (e, todo) => void;
  onDragOver: (todoListCategoryType) => void;
  onDragEnd: () => void;
}

export const TodoList = ({
  todoListCategoryType,
  todoList,
  handleCompleteTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  handleAddTodoItem,
  onDragStart,
  onDragOver,
  onDragEnd
}: TodoListProps) => {
  return (
    <Container onDragOver={() => onDragOver(todoListCategoryType)}>
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
      <AddTodoModal categoryType={todoListCategoryType} isButton={false} addItem={handleAddTodoItem} />
    </Container>
  );
};

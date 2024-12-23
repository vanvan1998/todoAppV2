'use client';
import React, { useEffect, useState } from 'react';
import { CheckList, TodoDetailItem } from '../../components';
import { TodoItemType } from '../../types';
import { useFirebase, useNotification, useMediaQuery } from '../../hooks';
import styled from 'styled-components';
import { styles } from './TaskDetail.styles';
import { HeaderTitle, Title } from 'src/components';
import { useRouter } from 'next/navigation';
import noTaskFound from '../../assets/no-task-found.png';

const Container = styled.div`
  ${styles.Container}
`;

const HeaderWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.headerWrapper}
`;

const NoTaskIcon = styled.img`
  ${styles.noTaskIcon}
`;

const NotFoundWrapper = styled.div`
  ${styles.notFoundWrapper}
`;

const TodoDetailWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.todoDetailWrapper}
`;

export const TaskDetailView = (props: any) => {
  const [todo, setTodo] = useState<TodoItemType | undefined>(undefined);
  const { findTodoItem, handleUpdateTodo, handleCompleteTodo, handleDeleteTodoItem } = useFirebase();
  useNotification();
  const router = useRouter();
  const taskId = props?.params?.taskId;
  const { isMobile } = useMediaQuery();
  useEffect(() => {
    if (taskId) {
      findTodoItem(taskId).then(todo => {
        todo && (todo.id = taskId);
        setTodo(todo);
      });
    }
  }, [taskId]);

  const updateTodo = async ({
    todo,
    fieldsToUpdate
  }: {
    todo: TodoItemType;
    fieldsToUpdate: Partial<TodoItemType>;
  }) => {
    await handleUpdateTodo({ todo, fieldsToUpdate });
    setTodo({ ...todo, ...fieldsToUpdate });
  };

  const completeTodo = async (todo: TodoItemType) => {
    await handleCompleteTodo(todo);
    setTodo({ ...todo, completed: !todo.completed });
  };

  const deleteTodo = async (id: string) => {
    await handleDeleteTodoItem(id);
    router.push('/');
  };

  return todo ? (
    <Container>
      <HeaderWrapper isMobile={isMobile}>
        <HeaderTitle style={{ fontWeight: '600' }}>Task Details</HeaderTitle>
        <Title>
          This task belongs to <Title style={{ fontWeight: 'bold' }}>{todo.email}</Title>
        </Title>
      </HeaderWrapper>
      <TodoDetailWrapper isMobile={isMobile}>
        <TodoDetailItem
          todo={todo}
          handleCompleteTodo={completeTodo}
          handleUpdateTodo={updateTodo}
          handleDeleteTodo={deleteTodo}
          isMobile={isMobile}
        />
        <CheckList
          todo={todo}
          handleCompleteTodo={completeTodo}
          handleUpdateTodo={updateTodo}
          handleDeleteTodo={deleteTodo}
          isMobile={isMobile}
        />
      </TodoDetailWrapper>
    </Container>
  ) : (
    <NotFoundWrapper>
      <NoTaskIcon src={noTaskFound.src} alt='No task found' />
      <Title style={{ fontSize: 24, color: '#9fa0ae' }}>Task is not found</Title>
    </NotFoundWrapper>
  );
};

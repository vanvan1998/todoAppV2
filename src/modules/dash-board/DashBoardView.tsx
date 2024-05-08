'use client';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Search, AddTodoModal, SortBy, TitleItem, TodoList } from '../../components';
import { SORT_BY } from '../../constants';
import { CategoryType, TodoItemType } from '../../types';
import { useFirebase, useNotification, useMediaQuery } from '../../hooks';
import styled from 'styled-components';
import { styles } from './DashBoard.styles';
import { Header } from 'src/theme';

const Container = styled.div`
  ${styles.Container}
`;

const HeaderWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.headerWrapper}
`;

const ActionWrapper = styled.div`
  ${styles.actionWrapper}
`;

const ContentWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.contentWrapper}
`;

const ItemWrapper = styled.div`
  ${styles.itemWrapper}
`;

export const DashBoardView = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(SORT_BY.NONE);
  const {
    todoList: allTodoList,
    handleUpdateTodo,
    handleCompleteTodo,
    handleDeleteTodoItem,
    handleAddTodoItem
  } = useFirebase();
  useNotification();
  const { isMobile } = useMediaQuery();

  const handleSort = (sortBy: string, items: TodoItemType[]) => {
    if (sortBy === SORT_BY.NONE) {
      return items;
    } else if (sortBy === SORT_BY.NEWEST) {
      return items.sort((a, b) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1));
    } else {
      return items.sort((a, b) => (dayjs(a.createdAt).isAfter(b.createdAt) ? 1 : -1));
    }
  };

  const handleSearch = async (searchString: string) => {
    setSearchString(searchString);
    if (isEmpty(searchString)) {
      setTodoList(handleSort(sortBy, allTodoList));
    } else {
      const searchStringArray = searchString.split(' ');
      const searchResult = allTodoList.filter(todo => {
        let isInclude = true;
        searchStringArray.forEach(item => {
          if (!todo.title.includes(item)) {
            isInclude = false;
            return;
          }
        });
        return isInclude;
      });
      setTodoList(handleSort(sortBy, searchResult));
    }
  };

  useEffect(() => {
    setSearchString('');
    setTodoList(handleSort(sortBy, allTodoList));
  }, [allTodoList, sortBy]);

  const groupTodoList = {
    urgent: todoList.filter(todo => todo.category === CategoryType.Urgent),
    important: todoList.filter(todo => todo.category === CategoryType.Important),
    upcoming: todoList.filter(todo => todo.category === CategoryType.Upcoming)
  };

  return (
    <Container>
      <HeaderWrapper isMobile={isMobile}>
        <Header style={{ fontWeight: '600' }}>My Tasks</Header>
        <ActionWrapper>
          <SortBy
            sortType={sortBy}
            handleSort={(value: string) => {
              setSortBy(value);
              setTodoList(handleSort(value, todoList));
            }}
          />
          <AddTodoModal addItem={handleAddTodoItem} />
        </ActionWrapper>
      </HeaderWrapper>
      <Search searchString={searchString} handleSearch={handleSearch} />
      <ContentWrapper isMobile={isMobile}>
        <ItemWrapper>
          <TitleItem title='URGENT' color='#e75565' count={groupTodoList.urgent.length} />
          <TodoList
            todoList={groupTodoList.urgent}
            handleCompleteTodo={handleCompleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodoItem}
          />
        </ItemWrapper>
        <ItemWrapper>
          <TitleItem title='IMPORTANT' color='#6459e3' count={groupTodoList.important.length} />
          <TodoList
            todoList={groupTodoList.important}
            handleCompleteTodo={handleCompleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodoItem}
          />
        </ItemWrapper>
        <ItemWrapper>
          <TitleItem title='UPCOMING' color='#24c5f5' count={groupTodoList.upcoming.length} />
          <TodoList
            todoList={groupTodoList.upcoming}
            handleCompleteTodo={handleCompleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodoItem}
          />
        </ItemWrapper>
      </ContentWrapper>
    </Container>
  );
};

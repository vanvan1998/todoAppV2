import React, { useState } from 'react';
import styled from 'styled-components';
import { styles } from './TodoDetailItem.styles';
import { SubTitle, Title } from 'src/components';
import { deletedColor, placeholderColor, primaryButtonColor } from 'src/theme';
import { Modal } from 'react-bootstrap';
import { CategoryType, TodoItemType } from '../../types';
import { DeleteIcon, EditIcon, ImportantIcon, UpcomingIcon, UrgentIcon } from '../../icons';
import { AddTodo } from '../addTodo';
import { MODE } from 'src/constants';
import { Button } from '../button';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { ProgressBar } from '../progress-bar';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const CategoryWrapper = styled.div<{ color: string }>`
  ${styles.category}
`;

const TitleWrapper = styled.div`
  ${styles.titleWrapper}
`;

const ActionWrapper = styled.div`
  ${styles.actionWrapper}
`;

const RightAction = styled.div`
  ${styles.rightAction}
`;

const NotificationWrapper = styled.div`
  ${styles.notificationWrapper}
`;

interface TodoDetailItemProps {
  todo: TodoItemType;
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
  isMobile: boolean;
}

export const categoryData = {
  [CategoryType.Urgent]: {
    color: '#db0f25',
    text: 'Urgent',
    icon: <UrgentIcon width={16} height={16} color='#db0f25' style={{ transform: 'rotate(270deg)' }} />
  },
  [CategoryType.Important]: {
    color: '#d25a12',
    text: 'Important',
    icon: <ImportantIcon width={16} height={16} color='#d25a12' />
  },
  [CategoryType.Upcoming]: {
    color: '#475071',
    text: 'Upcoming',
    icon: <UpcomingIcon width={16} height={16} color='#475071' />
  }
};

export const TodoDetailItem = ({
  todo,
  handleCompleteTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  isMobile
}: TodoDetailItemProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const progress = todo.completed
    ? 100
    : todo.checkList?.length
      ? (todo.checkList.filter(item => item.completed).length / todo.checkList.length) * 100
      : 0;

  return (
    <Container isMobile={isMobile}>
      <TitleWrapper>
        <Title style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 6 }}>{todo.title}</Title>
        <CategoryWrapper color={categoryData[todo.category as CategoryType].color}>
          {categoryData[todo.category as CategoryType].icon}
          {categoryData[todo.category as CategoryType].text}
        </CategoryWrapper>
      </TitleWrapper>
      {!isEmpty(todo.startDate) ? (
        <NotificationWrapper>
          <Title
            style={
              dayjs(`${todo?.startDate} ${todo?.startTime}`).unix() < dayjs().unix()
                ? { color: 'red' }
                : { color: 'green' }
            }
          >
            Expired time:&nbsp;
          </Title>
          <Title
            style={{
              fontWeight: 'bold',
              ...(dayjs(`${todo?.startDate} ${todo?.startTime}`).unix() < dayjs().unix()
                ? { color: 'red' }
                : { color: 'green' })
            }}
          >
            {todo.startDate}&nbsp;
            {todo.startTime}
          </Title>
        </NotificationWrapper>
      ) : null}
      <SubTitle style={{ width: '100%', paddingBottom: 20 }}>{todo.detail}</SubTitle>
      <ProgressBar count={progress} color={categoryData[todo.category as CategoryType].color} />
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
                  border: `1px solid ${placeholderColor}`,
                  color: primaryButtonColor
                }
              : {})
          }}
          testId='complete-todo-button'
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
              padding: '0',
              minHeight: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center'
            }}
            testId='edit-todo-button'
          >
            <EditIcon color={primaryButtonColor} width={18} height={18} />
          </Button>
          <Button
            handleButton={() => handleDeleteTodo(todo.id)}
            styles={{
              backgroundColor: 'white',
              padding: '0',
              minHeight: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center'
            }}
            testId='delete-todo-button'
          >
            <DeleteIcon color={deletedColor} width={18} height={18} />
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

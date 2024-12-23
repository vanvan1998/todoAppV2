import React, { useState } from 'react';
import styled from 'styled-components';
import { styles } from './TodoItem.styles';
import { SubTitle, Title } from 'src/components';
import { deletedColor, primaryButtonColor } from 'src/theme';
import { Modal } from 'react-bootstrap';
import { CategoryType, TodoItemType } from '../../types';
import { CheckedIcon, DeleteIcon, EditIcon } from '../../icons';
import { isEmpty } from 'lodash';
import { AddTodo } from '../addTodo';
import { MODE } from 'src/constants';
import { Button } from '../button';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '../progress-bar';
import { categoryData } from '../todo-detail-item';

const Container = styled.div`
  ${styles.container}
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
interface TodoItemProps {
  todo: TodoItemType;
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
  onDragStart: (e, todo) => void;
  onDragEnd: () => void;
}

export const TodoItem = ({
  todo,
  handleCompleteTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  onDragStart,
  onDragEnd
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const newDetail = !isEmpty(todo.detail) && todo.detail.length > 160 ? `${todo.detail.slice(0, 160)}...` : todo.detail;
  const progress = todo.completed
    ? 100
    : todo.checkList?.length
      ? (todo.checkList.filter(item => item.completed).length / todo.checkList.length) * 100
      : 0;

  return (
    <Container id={todo.id} draggable onDragStart={e => onDragStart(e, todo)} onDragEnd={onDragEnd}>
      <Title style={{ fontWeight: 500, paddingBottom: 6 }}>{todo.title}</Title>
      {!isEmpty(todo.startDate) ? (
        <NotificationWrapper>
          <Title
            style={{
              fontSize: 12,
              ...(dayjs(`${todo?.startDate} ${todo?.startTime}`).unix() < dayjs().unix()
                ? { color: 'red' }
                : { color: 'green' })
            }}
          >
            Expired time:&nbsp;
          </Title>
          <Title
            style={{
              fontWeight: 'bold',
              fontSize: 12,
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
      <SubTitle style={{ height: 60, width: '100%', marginBottom: 8 }}>{newDetail}</SubTitle>
      <ProgressBar count={progress} color={categoryData[todo.category as CategoryType].color} />
      <ActionWrapper>
        <Button
          handleButton={() => {
            router.push(`/task-detail/${todo.id}`);
          }}
          styles={{
            minHeight: 26,
            height: 26,
            padding: 0,
            backgroundColor: 'transparent',
            color: primaryButtonColor
          }}
          testId='task-details-button'
        >
          Task details
        </Button>
        <RightAction>
          <Button
            handleButton={() => handleCompleteTodo(todo)}
            styles={{
              minHeight: 26,
              height: 26,
              padding: 0,
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center'
            }}
            testId='complete-button'
          >
            {todo.completed ? (
              <CheckedIcon color={primaryButtonColor} width={18} height={18} />
            ) : (
              <SubTitle style={{ width: '100%', color: primaryButtonColor, fontSize: 14}}>Done</SubTitle>
            )}
          </Button>
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
            testId='edit-button'
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
            testId='delete-button'
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

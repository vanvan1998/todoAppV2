'use client';

import React from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useMediaQuery } from 'src/hooks';
import { ImportantIcon, UpcomingIcon, UrgentIcon } from 'src/icons';
import { Title } from 'src/components';
import { disabledButtonColor, primaryButtonColor } from 'src/theme';
import styled from 'styled-components';
import { DATE_FORMAT, MODE, TIME_FORMAT } from '../../constants';
import { CategoryType, TodoItemType } from '../../types';
import { Button } from '../button';
import { Input } from '../input';
import { styles } from './AddTodo.styles';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const Header = styled.div`
  ${styles.header}
`;

const Line = styled.div`
  ${styles.line}
`;

const Category = styled.div<{ isMobile: boolean }>`
  ${styles.category}
`;

const Notification = styled.div`
  ${styles.notification}
`;

const DateTimePicker = styled.div`
  ${styles.dateTimePicker}
`;

const Description = styled.textarea`
  ${styles.description}
`;

const ButtonWrapper = styled.div`
  ${styles.buttonWrapper}
`;

export const AddTodo = ({
  mode,
  addItem,
  updateItem,
  onComplete,
  todo,
  categoryType = CategoryType.Upcoming
}: {
  mode: string;
  todo?: TodoItemType;
  addItem?: (item: Partial<TodoItemType>) => void;
  updateItem?: ({ todo, fieldsToUpdate }: { todo: TodoItemType; fieldsToUpdate: Partial<TodoItemType> }) => void;
  onComplete: () => void;
  categoryType?: CategoryType;
}) => {
  const isAddItem = mode === MODE.ADD;
  const newDateTime = dayjs().add(1, 'hours');
  const currentDateTime = dayjs(`${todo?.startDate} ${todo?.startTime}`);

  const [title, setTitle] = useState(isAddItem ? '' : todo?.title);
  const [detail, setDetail] = useState(isAddItem ? '' : todo?.detail);
  const [notification, setNotification] = useState(isAddItem ? false : todo?.notification);
  const [category, setCategory] = useState(isAddItem ? categoryType : todo?.category);
  const [date, setDate] = useState(!isAddItem && todo?.notification ? currentDateTime : newDateTime);
  const [time, setTime] = useState(!isAddItem && todo?.notification ? currentDateTime : newDateTime);
  const { isMobile } = useMediaQuery();

  const handleAddOrEdit = async (e: any) => {
    e.preventDefault();
    if (isAddItem) {
      !isEmpty(title) &&
        addItem &&
        addItem({
          title: title!,
          detail: detail || '',
          notification,
          category,
          startDate: notification ? date.format(DATE_FORMAT) : '',
          startTime: notification ? time.format(TIME_FORMAT) : ''
        });
      setTitle('');
      setDetail('');
    } else {
      updateItem &&
        updateItem({
          todo: todo!,
          fieldsToUpdate: {
            title,
            detail,
            notification,
            category,
            startDate: notification ? date.format(DATE_FORMAT) : '',
            startTime: notification ? time.format(TIME_FORMAT) : ''
          }
        });
    }
    onComplete();
  };

  return (
    <Container isMobile={isMobile}>
      <Header>
        <Title styles='font-size: 20px; font-weight: 600;'>{isAddItem ? 'New Task Todo' : 'Update Task Todo'}</Title>
        <Line />
      </Header>

      <Input
        title='Title Task'
        value={title || ''}
        onChange={setTitle}
        styles={{ marginBottom: 16 }}
        placeholder='Enter new task todo...'
        inputStyles={isMobile ? { maxWidth: 438, minWidth: 294, width: '100%' } : { minHeight: 40, minWidth: 438 }}
        titleStyles={{ fontSize: 14, fontWeight: 500 }}
      />

      <Title styles='font-weight: 500; margin-bottom: 8px;'>Category</Title>
      <Category isMobile={isMobile}>
        <Button
          title='Upcoming'
          handleButton={() => {
            setCategory(CategoryType.Upcoming);
          }}
          styles={{
            height: 36,
            minHeight: 36,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 130,
            backgroundColor: category === CategoryType.Upcoming ? primaryButtonColor : disabledButtonColor
          }}
          testId='upcoming-button'
        >
          <UpcomingIcon width={16} height={16} />
        </Button>
        <Button
          title='Important'
          handleButton={() => {
            setCategory(CategoryType.Important);
          }}
          styles={{
            height: 36,
            minHeight: 36,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 130,
            backgroundColor: category === CategoryType.Important ? primaryButtonColor : disabledButtonColor
          }}
          testId='important-button'
        >
          <ImportantIcon width={16} height={16} color='#d25a12' />
        </Button>
        <Button
          title='Urgent'
          handleButton={() => {
            setCategory(CategoryType.Urgent);
          }}
          styles={{
            height: 36,
            minHeight: 36,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 130,
            backgroundColor: category === CategoryType.Urgent ? primaryButtonColor : disabledButtonColor
          }}
          testId='urgent-button'
        >
          <UrgentIcon width={16} height={16} color='#db0f25' style={{ transform: 'rotate(270deg)' }} />
        </Button>
      </Category>

      <Title styles='font-weight: 500; margin-bottom: 8px;'>Description</Title>
      <Description
        placeholder='Enter description...'
        value={detail}
        onChange={e => {
          e.preventDefault();
          setDetail(e.target.value);
        }}
      />

      <Notification>
        <Title styles='font-size: 14px; font-weight: 500;'>Notification</Title>
        <div className='form-check form-switch'>
          <input
            className='form-check-input'
            type='checkbox'
            role='switch'
            id='flexSwitchCheckDefault'
            checked={notification}
            style={{ width: 40, height: 20 }}
            onChange={() => {
              setNotification(!notification);
            }}
          />
        </div>
      </Notification>
      {notification ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker>
            <TimePicker
              orientation='landscape'
              defaultValue={time}
              onChange={value => {
                if (value) {
                  setTime(value);
                }
              }}
            />
            <DatePicker
              defaultValue={date}
              onChange={value => {
                if (value) {
                  setDate(value);
                }
              }}
              slotProps={{
                actionBar: {
                  actions: ['today']
                }
              }}
            />
          </DateTimePicker>
        </LocalizationProvider>
      ) : (
        <></>
      )}

      <ButtonWrapper>
        <Button
          title='Cancel'
          handleButton={onComplete}
          buttonType='secondary'
          styles={{
            flex: 1
          }}
          testId='cancel-todo-button'
        />
        <Button
          title={isAddItem ? 'Create' : 'Update'}
          handleButton={handleAddOrEdit}
          styles={{
            flex: 1
          }}
          testId='add-todo-button'
        />
      </ButtonWrapper>
    </Container>
  );
};

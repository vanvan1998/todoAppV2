'use client';

import React, { useState } from 'react';
import { Collapse, Button, Modal } from 'react-bootstrap';
import { TodoItemType } from '../types';
import { isEmpty } from 'lodash';
import { AddTodo } from './addTodo';
import { MODE } from '../constants';
import { CheckedIcon, DeleteIcon, EditIcon, ExpandLessIcon, ExpandMoreIcon, UnCheckedIcon } from '../icons';

interface TodoItemProps {
  todo: TodoItemType;
  handleCompleteTodo: (todo: TodoItemType) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: (todo: TodoItemType) => void;
}

export const TodoItem = ({ todo, handleCompleteTodo, handleDeleteTodo, handleUpdateTodo }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  return (
    <div
      style={{
        margin: '0 16px 16px 16px',
        borderBottom: '1px solid #ced4da'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Button
            className='button-complete'
            onClick={() => handleCompleteTodo(todo)}
            style={{ backgroundColor: 'white', border: 'none', padding: 0 }}
          >
            {todo.completed ? <CheckedIcon color='#188f10' /> : <UnCheckedIcon color='#188f10' />}
          </Button>
          <div>
            <div
              style={{
                width: '100%',
                height: 36,
                padding: '4px 16px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                fontWeight: 'bold',
                color: '#212529',
                fontSize: 16,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {todo.title}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {!isEmpty(todo.detail) || todo.notification ? (
            <Button
              onClick={e => {
                e.preventDefault();
                setIsOpenCollapse(!isOpenCollapse);
              }}
              style={{
                backgroundColor: 'white',
                border: 'none',
                padding: 0,
                marginRight: 10
              }}
            >
              {isOpenCollapse ? <ExpandLessIcon color='black' /> : <ExpandMoreIcon color='black' />}
            </Button>
          ) : (
            <></>
          )}
          <Button
            className='button-edit'
            onClick={() => {
              if (isEdit) {
                setIsEdit(false);
              } else {
                setIsEdit(true);
              }
            }}
            style={{ backgroundColor: 'white', border: 'none', padding: 0 }}
          >
            <EditIcon color='black' />
          </Button>
          <Button
            className='button-delete'
            onClick={() => handleDeleteTodo(todo.id)}
            style={{ backgroundColor: 'white', border: 'none', padding: 0 }}
          >
            <DeleteIcon color='black' />
          </Button>
        </div>
      </div>

      <Collapse in={isOpenCollapse}>
        <div style={{ height: 150 }}>
          {todo?.notification && (
            <div
              style={{
                padding: '6px 0 4px 6px',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              Task start at {`${todo?.startDate} ${todo?.startTime}`}
            </div>
          )}
          {todo.detail ? (
            <>
              <div
                style={{
                  padding: '4px 0 4px 6px',
                  fontWeight: 'bold',
                  fontSize: 14
                }}
              >
                Detail:
              </div>
              <div
                style={{
                  height: 150,
                  fontSize: 14,
                  padding: '0 8px 8px 20px',
                  overflow: 'auto'
                }}
              >
                {todo.detail}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Collapse>

      <Modal
        style={{
          width: '100%',
          height: '100vh',
          paddingTop: 120
        }}
        show={isEdit}
        onHide={handleCloseEdit}
      >
        <AddTodo mode={MODE.UPDATE} updateItem={handleUpdateTodo} onComplete={handleCloseEdit} todo={todo} />
      </Modal>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MODE } from '../../constants';
import { AddTodo } from '../addTodo';
import { useMediaQuery } from 'src/hooks';
import { Button } from '../button';
import { AddIcon } from 'src/icons';
import { CategoryType } from 'src/types';

export const AddTodoModal = ({
  addItem,
  isButton = true,
  categoryType
}: {
  addItem: (arg: any) => void;
  isButton?: boolean;
  categoryType?: CategoryType;
}) => {
  const [show, setShow] = useState(false);
  const { isMobile } = useMediaQuery();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {isButton ? (
        <Button
          handleButton={handleShow}
          styles={{
            height: 36,
            minHeight: 36,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          testId='show-modal-button'
        >
          Add new task
          <AddIcon width={16} height={16} />
        </Button>
      ) : (
        <Button
          handleButton={handleShow}
          buttonType='secondary'
          styles={{
            height: 194,
            padding: '0 16px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'dashed',
            backgroundColor: '#f2f6fa'
          }}
        >
          <AddIcon width={32} height={32} />
        </Button>
      )}

      <Modal
        style={{
          width: '100%',
          height: '100vh',
          paddingTop: isMobile ? 16 : 40
        }}
        show={show}
        onHide={handleClose}
      >
        <AddTodo categoryType={categoryType} mode={MODE.ADD} addItem={addItem} onComplete={handleClose} />
      </Modal>
    </div>
  );
};

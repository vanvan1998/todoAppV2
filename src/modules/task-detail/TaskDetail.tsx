'use client';
import React from 'react';
import { PrivateLayout } from '../../components';
import { TaskDetailView } from './TaskDetailView';

export const TaskDetail = (props: any) => {
  return (
    <PrivateLayout isPrivate={false}>
      <TaskDetailView {...props} />
    </PrivateLayout>
  );
};

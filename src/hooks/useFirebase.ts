import { useState, useEffect } from 'react';
import { db } from '../firebase';
import dayjs from 'dayjs';
import { useAuth } from '../contexts/AuthContext';
import { TodoItemType } from '../types';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

export const useFirebase = () => {
  const { currentUser } = useAuth();
  const dbKey = currentUser.uid;
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  console.log(db, dbKey, currentUser);

  useEffect(() => {
    const q = query(collection(db, dbKey));
    const unsub = onSnapshot(q, querySnapshot => {
      const todoList: TodoItemType[] = [];
      querySnapshot.forEach((doc: any) => {
        todoList.push({ ...doc.data(), id: doc.id });
      });
      setTodoList(todoList);
    });
    return () => unsub();
  }, [dbKey]);

  const handleAddTodoItem = async ({
    title,
    detail,
    notification,
    startDate,
    startTime,
    category
  }: {
    title: string;
    detail: string;
    notification?: boolean;
    startDate?: string;
    startTime?: string;
    category: number;
  }) => {
    await addDoc(collection(db, dbKey), {
      title,
      completed: false,
      detail,
      startDate: startDate,
      startTime: startTime,
      notification: notification || false,
      category: category || 0,
      createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss')
    });
  };

  const handleUpdateTodo = async ({
    todo,
    fieldsToUpdate
  }: {
    todo: TodoItemType;
    fieldsToUpdate: Partial<TodoItemType>;
  }) => {
    await updateDoc(doc(db, dbKey, todo.id), {
      ...todo,
      ...fieldsToUpdate
    });
  };

  const handleCompleteTodo = async (todo: TodoItemType) => {
    await updateDoc(doc(db, dbKey, todo.id), { completed: !todo.completed });
  };

  const handleDeleteTodoItem = async (id: string) => {
    await deleteDoc(doc(db, dbKey, id));
  };

  return { todoList, handleAddTodoItem, handleUpdateTodo, handleCompleteTodo, handleDeleteTodoItem };
};

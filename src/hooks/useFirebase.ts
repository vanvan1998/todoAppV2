import { useState, useEffect } from 'react';
import { db } from '../firebase';
import dayjs from 'dayjs';
import { useAuth } from 'src/contexts/AuthContext';
import { TodoItemType } from '../types';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc, where, getDoc } from 'firebase/firestore';
import { COLLECTION_TASKS } from 'src/constants';

export const useFirebase = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [todo, setTodo] = useState<TodoItemType | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, COLLECTION_TASKS), where('userId', '==', userId));
    const unsub = onSnapshot(q, querySnapshot => {
      const todoList: TodoItemType[] = [];
      querySnapshot.forEach((doc: any) => {
        todoList.push({ ...doc.data(), id: doc.id });
      });
      setTodoList(todoList);
    });
    return () => unsub();
  }, [userId]);

  const findTodoItem = async (taskId: string): Promise<TodoItemType | undefined> => {
    const docRef = doc(db, COLLECTION_TASKS, taskId);
    const task = await getDoc(docRef);
    setTodo(task.data() as TodoItemType);
    return task.data() as TodoItemType;
  };

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
    await addDoc(collection(db, COLLECTION_TASKS), {
      userId,
      title,
      completed: false,
      detail,
      startDate: startDate,
      startTime: startTime,
      notification: notification || false,
      category: category,
      createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      email: currentUser?.email
    });
  };

  const handleUpdateTodo = async ({
    todo,
    fieldsToUpdate
  }: {
    todo: TodoItemType;
    fieldsToUpdate: Partial<TodoItemType>;
  }) => {
    const res = await updateDoc(doc(db, COLLECTION_TASKS, todo.id), {
      ...todo,
      ...fieldsToUpdate
    });
    console.log('res', res);
  };

  const handleCompleteTodo = async (todo: TodoItemType) => {
    await updateDoc(doc(db, COLLECTION_TASKS, todo.id), { completed: !todo.completed });
  };

  const handleDeleteTodoItem = async (id: string) => {
    await deleteDoc(doc(db, COLLECTION_TASKS, id));
  };

  return {
    todo,
    todoList,
    handleAddTodoItem,
    handleUpdateTodo,
    handleCompleteTodo,
    handleDeleteTodoItem,
    findTodoItem
  };
};

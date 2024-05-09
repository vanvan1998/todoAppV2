export interface TodoItemType {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
  startDate?: string;
  startTime?: string;
  notification?: boolean;
  createdAt: string;
  email: string;
  category: number;
  userId: any;
}

export enum CategoryType {
  Upcoming,
  Important,
  Urgent
}

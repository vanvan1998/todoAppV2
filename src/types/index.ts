export interface CheckListType {
  title: string;
  completed: boolean;
}

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
  checkList: CheckListType[];
}

export enum CategoryType {
  Upcoming,
  Important,
  Urgent
}

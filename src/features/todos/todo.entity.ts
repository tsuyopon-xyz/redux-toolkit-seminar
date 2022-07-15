import { v4 as uuidv4 } from 'uuid';
import { DateTime, getCurrentDateTime } from '@/src/utils/date';

export type TodoId = string;

type TodoStatus =
  | 'waiting'
  | 'working'
  | 'pending'
  | 'discontinued'
  | 'completed';

export type TodoInput = {
  id?: TodoId;
  title: string;
  body: string;
  status?: TodoStatus;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  deletedAt?: DateTime;
};

export type TodoEntityType = {
  id: TodoId;
  title: string;
  body: string;
  status: TodoStatus;
  createdAt: DateTime;
  updatedAt?: DateTime;
  deletedAt?: DateTime;
};

export const createTodoEntity = (input: TodoInput): TodoEntityType => {
  return {
    id: input.id ?? uuidv4(),
    title: input.title,
    body: input.body,
    status: input.status ?? 'waiting',
    createdAt: input.createdAt || getCurrentDateTime(),
    updatedAt: input.updatedAt,
    deletedAt: input.deletedAt,
  };
};

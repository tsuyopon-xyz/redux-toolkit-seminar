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
  deleteAt?: DateTime;
};

export class TodoEntity {
  public readonly id: TodoId;
  public readonly title: string;
  public readonly body: string;
  public readonly status: TodoStatus;
  public readonly createdAt: DateTime;
  public readonly updatedAt?: DateTime;
  public readonly deleteAt?: DateTime;

  constructor(input: TodoInput) {
    this.id = input.id || uuidv4();
    this.title = input.title;
    this.body = input.body;
    this.status = input.status || 'waiting';
    this.createdAt = input.createdAt || getCurrentDateTime();
    this.updatedAt = input.updatedAt;
    this.deleteAt = input.deleteAt;
  }
}

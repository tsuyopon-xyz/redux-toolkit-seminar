// https://kenjimorita.jp/jest-uuid-v4-syntaxerror-unexpected-token-export/
// 「uuid.v4()」がjestで通らなかったので、上記記事を参考に、uuidのバージョンを特定のものにした
import { v4 as uuidv4 } from 'uuid';
import { DateTime, getCurrentDateTime } from '@/src/utils/date';

export type TodoId = string;

// 配列の値からtypeを作成する際に参考にしたページ
// https://github.com/microsoft/TypeScript/issues/28046#issuecomment-607145719
export const TODO_STATUSES = <const>[
  'waiting',
  'working',
  'pending',
  'discontinued',
  'completed',
];
export type TodoStatus = typeof TODO_STATUSES[number];

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

import type { TodoEntityType } from '../todo.entity';

const PREFIX_KEY = 'redux-toolkit-seminar';
const LOCAL_STORAGE_KEY = `${PREFIX_KEY}:todos`;

export const setTodos = (entities: TodoEntityType[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entities));
};

export const getTodos = (): TodoEntityType[] => {
  const jsonEntities = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!jsonEntities) return [];

  const entities = JSON.parse(jsonEntities) as TodoEntityType[];
  return entities;
};

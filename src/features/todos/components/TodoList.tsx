import { FC } from 'react';
import { useTodos, DISPLAY_FLAG_MAP, DisplayFlagType } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoTable } from './TodoTable';

export const TodoList: FC = () => {
  const {
    todos,
    displayFlag,
    isLoading,
    setDisplayFlag,
    addTodo,
    updateTodo,
    removeTodo,
    restoreTodo,
  } = useTodos();

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div>
      <TodoForm onSubmit={(input) => addTodo(input)} />
      <hr />
      <div>
        閲覧フラグ
        <select
          value={displayFlag}
          onChange={(e) => setDisplayFlag(e.target.value as DisplayFlagType)}
        >
          {Object.entries(DISPLAY_FLAG_MAP).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      </div>

      <TodoTable
        todos={todos}
        displayFlag={displayFlag}
        onUpdate={(input) => {
          updateTodo({
            id: input.id!,
            input,
          });
        }}
        onRemove={(id) => {
          removeTodo(id);
        }}
        onRestore={(id) => {
          restoreTodo(id);
        }}
      />
    </div>
  );
};

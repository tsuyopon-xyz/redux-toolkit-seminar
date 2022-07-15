import { FC } from 'react';
import { Counter } from '@/src/features/counter/Counter';
import { TodoList } from '@/src/features/todos/TodoList';

const App: FC = () => {
  return (
    <div>
      <Counter />
      <hr />
      <TodoList />
    </div>
  );
};

export default App;

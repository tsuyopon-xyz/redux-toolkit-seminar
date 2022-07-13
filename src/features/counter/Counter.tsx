import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from './counterSlice';

export const Counter: FC = () => {
  // const count = useAppSelector((state) => state.counter.value);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementAsync(10))}>
          Increment Async by 10
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </button>
      </div>
    </div>
  );
};

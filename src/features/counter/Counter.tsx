import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import { decrement, increment, selectCount } from './counterSlice';

export const Counter: FC = () => {
  // const count = useAppSelector((state) => state.counter.value);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

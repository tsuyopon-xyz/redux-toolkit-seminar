import { SerializedError } from '@reduxjs/toolkit';
import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  counterSlice,
  selectCount,
  CounterState,
} from './counterSlice';
import type { RootState } from '@/src/app/store';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
    error: null,
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
      error: null,
    });
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});

describe('counter actions', () => {
  it('should have amount number in the action payload', () => {
    const amount = 111;
    const action = incrementByAmount(amount);
    expect(action).toEqual({
      type: `${counterSlice.name}/incrementByAmount`,
      payload: amount,
    });
  });
});

describe('counter selector', () => {
  it('should return counter value by the selectCount function', () => {
    const state: RootState = {
      counter: {
        value: 100,
        status: 'idle',
        error: null,
      },
    };

    expect(selectCount(state)).toEqual(100);
  });
});

describe('counter async thunk', () => {
  it('sets loading state when pending', async () => {
    const state: CounterState = {
      value: 0,
      status: 'idle',
      error: null,
    };

    const action = {
      type: incrementAsync.pending.type,
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      value: 0,
      status: 'loading',
      error: null,
    });
  });

  it('sets status idle and increment value when fulfilled', async () => {
    const state: CounterState = {
      value: 0,
      status: 'loading',
      error: null,
    };

    const action = {
      type: incrementAsync.fulfilled.type,
      payload: 123,
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      value: 123,
      status: 'idle',
      error: null,
    });
  });

  it('sets status idle and error with error object.', async () => {
    const state: CounterState = {
      value: 0,
      status: 'loading',
      error: null,
    };

    const action = {
      type: incrementAsync.rejected.type,
      error: {
        message: 'Rejected!',
      } as SerializedError,
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      value: 0,
      status: 'idle',
      error: action.error,
    });
  });
});

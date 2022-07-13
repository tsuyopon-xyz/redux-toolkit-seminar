import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  counterSlice,
  selectCount,
} from './counterSlice';
import type { RootState } from '@/src/app/store';

describe('counter reducer', () => {
  const initialState = {
    value: 3,
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
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
      },
    };

    expect(selectCount(state)).toEqual(100);
  });
});

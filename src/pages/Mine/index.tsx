import React from 'react';
import { decrement, increment, asyncIncrement } from './model/mine';
import { useAppSelector, useAppDispatch } from '@/src/utils/typedHooks';

const Mine: React.FC = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.mine.value);
  const dispatch = useAppDispatch();

  return (
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
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(asyncIncrement(2))}
      >
        asyncIncrement
      </button>
    </div>
  );
};

export default Mine;

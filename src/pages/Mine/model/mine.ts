import { AppThunk, RootState } from '@/src/core/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCount } from '@/src/service/api';

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const asyncIncrement =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    // selectCount(getState());
    const response = await fetchCount(amount);
    dispatch(incrementByAmount(response.data));
  };

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.mine.value;

export default counterSlice.reducer;

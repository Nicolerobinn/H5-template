import {
  createSlice,
  // ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
  // 额外的reducer，处理异步action的reducer
  // extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
  //   builder.addCase('ASYNC_', (state: CounterState, { payload }) => {});
  // }
  // extraReducers: {
  //   ['ASYNC_']: (state: CounterState, action: PayloadAction<number>) => {}
  // }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

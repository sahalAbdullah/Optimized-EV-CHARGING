import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  value: boolean;
}
const initialState: CounterState = {
  value: false,
};
export const authSliceReducer = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authToken: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {authToken} = authSliceReducer.actions;

export default authSliceReducer.reducer;

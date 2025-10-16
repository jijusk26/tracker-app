import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  selectedDate: number;
}

const initialState: DateState = {
  selectedDate: new Date().getTime(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<number>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;

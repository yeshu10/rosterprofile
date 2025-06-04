import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeMenu: string;
}

const initialState: UIState = {
  activeMenu: 'about',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<string>) {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = uiSlice.actions;

export default uiSlice.reducer; 
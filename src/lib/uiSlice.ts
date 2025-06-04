import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeMenu: string;
  visibleExperiencesCount: number;
}

const initialState: UIState = {
  activeMenu: 'about',
  visibleExperiencesCount: 2,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<string>) {
      state.activeMenu = action.payload;
    },
    setVisibleExperiencesCount(state, action: PayloadAction<number>) {
      state.visibleExperiencesCount = action.payload;
    },
    resetVisibleExperiencesCount(state) {
      state.visibleExperiencesCount = 2;
    },
  },
});

export const { setActiveMenu, setVisibleExperiencesCount, resetVisibleExperiencesCount } = uiSlice.actions;

export default uiSlice.reducer; 
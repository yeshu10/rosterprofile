import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import modalReducer from './modalSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    modal: modalReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
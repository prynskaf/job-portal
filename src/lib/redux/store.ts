// lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      jobs: jobsReducer,
    },
  });
};

// Infer the types of the store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
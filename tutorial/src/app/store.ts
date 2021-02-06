import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/task/taskSlice';
import fetchReducer from '../features/fetch/fetchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    fetch: fetchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

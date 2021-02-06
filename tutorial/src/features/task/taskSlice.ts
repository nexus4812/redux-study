import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type task = {
  id: number,
  title: string,
  completed: boolean
};

type taskState = {
  idCount: number,
  tasks : task[],
}

const initialState: taskState = {
  idCount: 1,
  tasks: [{
    id: 1,
    title: 'hello',
    completed: false
  }]
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    newTask: (state: taskState, action: PayloadAction<string>): void => {
      state.idCount++;
      state.tasks = [{
        id: state.idCount,
        title: action.payload,
        completed: false
      }, ...state.tasks];
    },
    completeTask: (state: taskState, action: PayloadAction<number>): void => {
      const task = state.tasks.find(task => (task.id === action.payload));
      if(task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state: taskState, action: PayloadAction<number>): void => {
      state.tasks = state.tasks.filter(task => (task.id !== action.payload))
    },
  },
});

export const { newTask, completeTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;

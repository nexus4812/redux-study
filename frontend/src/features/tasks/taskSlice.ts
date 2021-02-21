import {createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder, Action} from "@reduxjs/toolkit";
import axios from 'axios';
import {RootState} from "../../app/store";

const hostUrl = 'http://127.0.0.1:8000/';
const endpoint = `${hostUrl}api/tasks`;
const token: string = localStorage.localJWT;
const requestHeaders = {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json'
};

type tasksType = {
    tasks: taskType[],
    editedTask: taskType,
    selectedTask: taskType,
}

export type taskType = {
    id: number,
    title: string,
    created_at: string,
    updated_at: string,
}

export const emptyTask: taskType = {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
};

const initialTask: tasksType = {
    tasks: [emptyTask],
    editedTask: emptyTask,
    selectedTask: emptyTask,
};

export const fetchAsyncGet = createAsyncThunk<taskType[]>('task/get', async () => {
    const r = await axios.get(endpoint, {
        headers: requestHeaders
    });
    return r.data;
});

export const fetchAsyncCreate = createAsyncThunk<taskType, taskType>('task/post', async (task: taskType) => {
    const r = await axios.post(endpoint, task, {
        headers: requestHeaders
    });
    return r.data;
});

export const fetchAsyncUpdate = createAsyncThunk<taskType, taskType>('task/put', async (task: taskType) => {
    const r = await axios.put(`${endpoint}/${task.id}`, task, {
        headers: requestHeaders
    });
    return r.data;
});

export const fetchAsyncDelete = createAsyncThunk<number, number>('task/delete', async (deleteTaskId: number) => {
    const r = await axios.delete(`${endpoint}/${deleteTaskId}`, {
        headers: requestHeaders
    });
    return r.data;
});

const taskSlice = createSlice({
    name: 'selectTasks',
    initialState: initialTask,
    reducers: {
        editTask: (state: tasksType, action: PayloadAction<taskType>): void => {
            state.editedTask = action.payload;
        },

        selectTask: (state: tasksType, action: PayloadAction<taskType>): void => {
            state.selectedTask = action.payload;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<tasksType>): void => {
        builder.addCase(fetchAsyncGet.fulfilled, (state: tasksType, action: PayloadAction<taskType[]>): tasksType => {
            return {...state, tasks: action.payload};
        });

        builder.addCase(fetchAsyncCreate.fulfilled, ((state: tasksType, action: PayloadAction<taskType>): tasksType => {
            return {...state, tasks: [action.payload, ...state.tasks]}
        }));

        builder.addCase(fetchAsyncUpdate.fulfilled, ((state: tasksType, action: PayloadAction<taskType>): tasksType => {
            return {
                ...state,
                tasks: state.tasks.map<taskType>((task: taskType):taskType => (task.id !== action.payload.id ? task : action.payload)),
                selectedTask: action.payload
            }
        }));

        builder.addCase(fetchAsyncDelete.fulfilled, ((state: tasksType, action: PayloadAction<number>): tasksType => {
            return {
                ...state,
                tasks: state.tasks.filter((task: taskType):boolean => (action.payload !== task.id)),
                selectedTask: emptyTask
            }
        }));
    }
});

export const {editTask, selectTask} = taskSlice.actions;

export const selectTasks = (state: RootState):taskType[] => state.task.tasks;
export const selectEditedTask = (state: RootState):taskType => state.task.editedTask;
export const selectSelectedTask = (state: RootState):taskType => state.task.selectedTask;

export default taskSlice.reducer;
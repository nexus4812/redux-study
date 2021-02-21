import React, {ReactElement} from "react";
import styles from "./TaskInput.module.css";
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from "react-redux";

import {
    fetchAsyncCreate,
    fetchAsyncUpdate,
    editTask,
    selectEditedTask, taskType, emptyTask,
} from "./taskSlice";
import {RootState} from "../../app/store";

const TaskInput = (): ReactElement => {
    const dispatch = useDispatch();
    const editedTask: taskType = useSelector<RootState, taskType>(selectEditedTask);

    const editTaskHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        editedTask.title === '' ?
            dispatch(editTask({...emptyTask, title: e.target.value} as taskType)) :
            dispatch(editTask({...editedTask, title: e.target.value} as taskType));
    };

    const isDisabled: boolean = editedTask.title.length === 0;

    const createTask = (): void => {
        dispatch(fetchAsyncCreate(editedTask));
        dispatch(editTask(emptyTask))
    };

    const updateTask = (): void => {
        dispatch(fetchAsyncUpdate(editedTask));
        dispatch(editTask(emptyTask))
    };


    return (<div>
        <input
            type="text"
            className={styles.taskInput}
            value={editedTask.title}
            onChange={(e) => {editTaskHandler(e)}}
        />

        <div className={styles.switch}>
            {editedTask.id === 0 ? (
                <Button
                    variant='contained'
                    disabled={isDisabled}
                    onClick={() => {createTask()}}
                />
            ) : (
                <Button
                    variant='contained'
                    disabled={isDisabled}
                    onClick={() => {updateTask()}}
                />
            )}
        </div>
    </div>)
};

export default TaskInput;
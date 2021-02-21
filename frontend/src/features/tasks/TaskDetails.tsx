import React, {ReactElement} from "react";
import styles from "./TaskDetails.module.css";
import { useSelector } from "react-redux";
import {selectSelectedTask, taskType} from "./taskSlice";
import {RootState} from "../../app/store";

const TaskDetails = (): ReactElement => {
    const selectedTask: taskType = useSelector<RootState, taskType>(selectSelectedTask);
    return (
        <div className={styles.details}>
            {selectedTask.title && (
                <>
                    <h2>{selectedTask.title}</h2>
                    <p>Created at </p>
                    <h3>{selectedTask.created_at}</h3>
                    <p>Updated at </p>
                    <h3>{selectedTask.updated_at}</h3>
                </>
            )}
        </div>
    );
};

export default TaskDetails;

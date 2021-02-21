import React, {ReactElement, useEffect} from "react";
import styles from "./TaskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
//
// import { fetchAsyncProf } from "../login/loginSlice";
import {selectSelectedTask, fetchAsyncGet, selectTasks, taskType} from "./taskSlice";
import {fetchAsyncProfile} from "../login/loginSlice";

const TaskList = () => {
    const taskList = useSelector(selectTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAsync = async (): Promise<void> => {
            await dispatch(fetchAsyncGet());
            await dispatch(fetchAsyncProfile());
        };

        fetchAsync();
    }, [dispatch]);

    return (
        <div>
            <ul className={styles.taskList}>
                {taskList.map((task: taskType): ReactElement => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
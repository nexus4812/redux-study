import React, {ReactElement, useEffect} from "react";
import {fetchAsyncCreate, fetchAsyncUpdate, taskType} from "./taskSlice";
import styles from "./TaskItem.module.css";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import {useDispatch} from "react-redux";

import {fetchAsyncDelete, selectTask, editTask} from "./taskSlice";


type propType = {
    task: taskType
}

const TaskItem = ({task}: propType): ReactElement => {
    const dispatch = useDispatch();
    return (<li className={styles.listItem}>
        <span className={styles.cursor} onClick={() => dispatch(selectTask(task))}>{task.title}</span>
        <div>
            <button onClick={() => dispatch(fetchAsyncDelete(task.id))}><BsTrash/></button>
        </div>
        <div>
            <button onClick={() => dispatch(fetchAsyncUpdate(task))}><FaEdit/></button>
        </div>
    </li>)
};


export default TaskItem;
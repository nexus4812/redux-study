import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectTasks,
    newTask
} from './taskSlice';
import {TaskItem} from "./TaskItem";

export function Task() {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    const [newTitle, setNewTitle] = useState('');

    return (
        <>
            <div>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                <button onClick={()=> {
                    dispatch(newTask(newTitle));
                    setNewTitle('');
                }}>Add task</button>
            </div>

            <div>
                {tasks.map((task, index) => (
                    <TaskItem task={task} key={index}/>
                ))}
            </div>
        </>
    );
}

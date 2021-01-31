import React from 'react';
import {useDispatch} from 'react-redux';
import {
    deleteTask,
    completeTask, task,
} from './taskSlice';


type props = {
    task: task
}

export function TaskItem({task}: props) {
    const dispatch = useDispatch();

    return (
        <div>
            <input
                type="checkbox"
                onClick={() => dispatch(completeTask(task.id))}
                defaultChecked={task.completed}
            />
            <span>{task.title}</span>

            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
        </div>
    );
}

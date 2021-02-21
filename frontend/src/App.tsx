import React from 'react';
import styles from './App.module.css';

import {FaSignInAlt} from 'react-icons/fa';
import TaskDetails from "./features/tasks/TaskDetails";
import TaskInput from "./features/tasks/TaskInput";
import TaskList from "./features/tasks/TaskList";

function App() {

  const Logout = () => {
      localStorage.removeItem('localJWT');
      window.location.href = '/';
  };

  return (
      <div className={styles.containerTasks}>
        <div className={styles.appTasks}>
          <button onClick={Logout} className={styles.signBtn}>
            <FaSignInAlt />
          </button>
            <TaskInput />
            <TaskList />
        </div>
        <div className={styles.appDetails}>
            <TaskDetails />
        </div>
      </div>
  );
}

export default App;

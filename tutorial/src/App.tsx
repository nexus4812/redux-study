import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Task} from "./features/task/Task";
import {Fetch} from "./features/fetch/Fetch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Task />
        <Counter />
        <Fetch />
      </header>
    </div>
  );
}

export default App;

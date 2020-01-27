import React from 'react';
import './App.css';


import ToDo from './components/ToDo'

const App: React.FC = () => {
  const ToDoList = [{id: 't1', text: 'create react app'}]

  return (
    <div className="App">
      <ToDo items={ToDoList}/>
    </div>
  );
}

export default App;

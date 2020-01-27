import React from 'react';
import './App.css';
import Tester from './components/Test'

const App: React.FC = () => {
  const testList = [{id: 't1', text: 'testing'}]
  return (
    <div className="App">
      <Tester items={testList} />
    </div>
  );
}

export default App;

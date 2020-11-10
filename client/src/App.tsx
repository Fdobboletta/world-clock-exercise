import React from 'react';
import './App.css';
import world from './world.png';
import WorldClock from './WorldClock/WorldClock';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <img src={world} alt="logo"/>
        <h1>World Clock</h1>
        <WorldClock/>
      </header>
    </div>
  );
}

export default App;

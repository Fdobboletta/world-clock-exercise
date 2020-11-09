import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  useEffect(() => {
    async function helloWorld() {
      const data = await fetch('http://localhost:4000/')
      return await data.json()
    }
    helloWorld()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

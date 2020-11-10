import React from 'react';
import './App.css';
import world from './world.png';
import Autocomplete from './Autocomplete/Autocomplete';
import ClockCardsSection from './ClockCardsSection/ClockCardsSection';


function App() {

  return (
    <div className="App">
      <header className="App-header">
      <img src={world} className="App-logo" alt="logo" />
        <h1>World Clock</h1>
        <Autocomplete/>
        <ClockCardsSection/>
      </header>
    </div>
  );
}

export default App;

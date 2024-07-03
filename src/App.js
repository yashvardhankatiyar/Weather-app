import './App.css';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Header from './components/Header';
import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');

  const searchCity = (data) => {
    setCity(data);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar searchCity={searchCity} />
      <Card city={city} />
    </div>
  );
}

export default App;

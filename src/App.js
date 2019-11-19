import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Home from './containers/Notes/Notes'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;

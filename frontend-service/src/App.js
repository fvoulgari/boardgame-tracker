// src/App.js
import React from 'react';
import BoardGameTracker from './BoardGameTracker';
import 'bulma/css/bulma.css'; // Import Bulma CSS for styling

const App = () => {
  return (
    <div className="container">
      <BoardGameTracker />
    </div>
  );
};

export default App;

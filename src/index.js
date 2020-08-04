import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MachineProvider from './Machine'

ReactDOM.render(
  <React.StrictMode>
    <MachineProvider>
      <App />
    </MachineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


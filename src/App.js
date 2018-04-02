import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopContainer from './TopContainer';

const App = () => (
  <Router>
    <MuiThemeProvider>
      <TopContainer />
    </MuiThemeProvider>
  </Router>
);

export default App;

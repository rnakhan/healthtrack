import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TopContainer from './TopContainer';
import BottomNav from './components/BottomNav';


const App = () => (
  <Router>
    <MuiThemeProvider>
      <TopContainer />
    </MuiThemeProvider>
  </Router>
);

export default App;

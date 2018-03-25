import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CarbContainer from './components/CarbContainer';

const App = () => (
  <MuiThemeProvider>
    <CarbContainer />
  </MuiThemeProvider>
);

export default App;

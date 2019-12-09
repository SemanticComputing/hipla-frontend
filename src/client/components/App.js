import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SemanticPortal from '../containers/SemanticPortal';
import deepPurple from '@material-ui/core/colors/deepPurple';
// import green from '@material-ui/core/colors/green';
// import deepOrange from '@material-ui/core/colors/deepOrange';
// import red from '@material-ui/core/colors/red';
// import amber from '@material-ui/core/colors/amber';
// import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <SemanticPortal />
  </MuiThemeProvider>
);

export default App;

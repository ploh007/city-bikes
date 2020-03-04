import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

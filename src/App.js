import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

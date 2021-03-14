/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider as AppProvider } from './context/AppContext';
import Predict from './sales/Predict';
import history from './history';


const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }, []);



  return (
    <AppProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Predict} />
        </Switch>
      </Router>
    </AppProvider >
  );
};
export default App;



import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage'
import ColumnPage from './containers/ColumnPage';

function App() {
  return (
    <div>
        <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/board/:id" exact component={ColumnPage}>
          </Route>
          <Route path="/home" exact>
            <HomePage/>
          </Route>
        </Switch>
        </Router>
      </div>
  )
}

export default App

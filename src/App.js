import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage'

function App() {
  return (
    <div>
        <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/home" exact component={HomePage}>
          </Route>
        </Switch>
        </Router>
      </div>
  )
}

export default App

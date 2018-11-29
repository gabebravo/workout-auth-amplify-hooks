import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './views/Dashboard';
import Workout from './views/Workout';
import NotSignedIn from './shared/NotSignedIn';

import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import { Auth } from 'aws-amplify'

class PrivateRoute extends React.Component {

  state = {
    loaded: false,
    isAuthenticated: false
  }

  componentDidMount() {
    this.authenticate()
    this.unlisten = this.props.history.listen(() => {
      Auth.currentAuthenticatedUser()
        .then(user => console.log('user: ', user))
        .catch(() => {
          if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
        })
    });
  }

  componentWillUnmount() {
    this.unlisten()
  }

  authenticate() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.setState({ loaded: true, isAuthenticated: true })
      })
      .catch(() => this.props.history.push('/not-signed-in'))
  }

  render() {

    const { component: Component, ...rest } = this.props
    const { loaded , isAuthenticated} = this.state

    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
              }}
            />
          )
        }}
      />
    )

  }
}

PrivateRoute = withRouter(PrivateRoute)

const App = () => (
  <Router>
    <Switch>
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/not-signed-in' component={NotSignedIn} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/workout/:workoutId' component={Workout} />
    </Switch>
  </Router>
)

export default App

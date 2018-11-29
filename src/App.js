import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './views/Dashboard';
import Workout from './views/Workout';
import ExerciseDef from './views/ExerciseDef';
import AddExercise from './views/AddExercise';
import WeightChart from './views/Charts/WeightChart';
import BodyWeightChart from './views/Charts/BodyWeightChart';
import CardioChart from './views/Charts/CardioChart';
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

// TODO - NO MORE PAGE REFERESHING OR BOOKMARKING
// IF A VALUE IS NOT THERE ON A REFRESH - REDIRECT THEM BACK TO DASHBOARD

const App = () => (
  <Router>
    <Switch>
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/not-signed-in' component={NotSignedIn} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/workout/:workoutId' component={Workout} />
      <PrivateRoute exact path="/weights/:name/:workoutId" component={WeightChart} />
      <PrivateRoute exact path="/body-weight/:name/:workoutId" component={BodyWeightChart} />
      <PrivateRoute exact path="/cardio/:name/:workoutId" component={CardioChart} />
      <PrivateRoute exact path="/exercise-def" component={ExerciseDef} />
      <PrivateRoute exact path="/add-exercise/:userId/:workoutId/:date" component={AddExercise} />
    </Switch>
  </Router>
)

export default App

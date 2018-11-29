import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { getUserWorkouts } from '../../queries';
// import { Mutation } from 'react-apollo'
// import { ADD_WORKOUT } from '../../mutations';
import Button from '@material-ui/core/Button';
import Header from '../../shared/Header';
import WorkoutList from './components/WorkoutList';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import { Auth } from 'aws-amplify'
import { AppContext } from "../../context/AppContext";

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Dashboard extends Component {

  static contextType = AppContext;

  sortWorkouts = workouts => [...workouts].sort( (a,b) => 
  moment.utc(b.date).valueOf() - moment.utc(a.date).valueOf());

  componentDidMount() {
    const { dispatch } = this.context;

    Auth.currentUserInfo()
      .then( async data => {
        // ON PAGE REFRESH CHECK FOR DATA WHEN YOU GET HERE
          console.log('userData', data)
          await dispatch({ type: "SET_VALUE", key: 'userId', value: data.attributes.sub } )
          await dispatch({ type: "SET_VALUE", key: 'username', value: data.username } )
      })
      .catch(err => console.log('error: ', err))
  }

  renderDashboard = userId => {
    const { classes } = this.props
    const { global } = this.context;

    return (
      <Query query={getUserWorkouts} variables={{ id: userId }}>
        {({ data }) => {
          console.log('data', data)
          return (
          <div>
            <Header name={ global.username || '' } />
            <div>
              {/* <Mutation mutation={ADD_WORKOUT}
                refetchQueries={() => {
                  return [{ query: getUserWorkouts }];
                }}
              >
                {createWorkout => (
                  <Button color="primary" autoFocus 
                    onClick={() => createWorkout({ 
                      variables: {
                        input: {
                          userId: match.params.userId,
                          date: moment().format('YYYY-MM-DD')
                        }
                      }
                  })}>
                    Add Workout
                  </Button>
                )}
              </Mutation> */}
              <Button color="primary" autoFocus 
                    onClick={() => {
                      Auth.signOut()
                        .then(() => {
                          // this.props.history.push('/auth')
                          this.props.history.push('/signin')
                          console.log('sign out')
                        })
                        .catch(() => console.log('error signing out...'))
                    }}>
                    Sign Out
                  </Button>
            </div>
            {
              data.listWorkouts && data.listWorkouts.items ? 
                <WorkoutList workouts={ this.sortWorkouts(data.listWorkouts.items) } /> : 
                <div className={classes.root}>
                  <LinearProgress color="secondary" /><br />
                  <LinearProgress /><br />
                </div>
            }
          </div>
        )}}
      </Query>
    )
}

  render() {
    const { classes } = this.props
    const { global, dispatch } = this.context;
    const dashboard = global.userId ? this.renderDashboard( global.userId, classes ) : null

    console.log('global state', global)

    return dashboard;
  }
}

export default withStyles(styles)(Dashboard);
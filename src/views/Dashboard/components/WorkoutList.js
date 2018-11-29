import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { getUserWorkouts, getWorkoutInfo } from '../../../queries';
import { Mutation } from 'react-apollo'
import { DELETE_WORKOUT } from '../../../mutations';
import { withStyles, withWidth, Button, Paper, List, ListSubheader } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import WorkoutInfo from './WorkoutInfo'
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import shortid from 'shortid';
import moment from 'moment';

const styles = theme => ({
  root: {
    marginTop: '1rem',
    width: '45%',
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: grey[400],
    color: '#fff',
    fontSize: '1.7rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1rem',
    },
    minHeight: '4rem',
  },
  subHeaderText: {
    width: '50%',
  },
  subHeaderButton: {
    width: '50%',
    textAlign: 'end',
  },
  icon: {
    fontSize: '2.5rem'
  }
});

class WorkoutList extends Component {

  addExerciseNav = (workoutId, date) => {
    const { userId } = this.props.match.params
    this.props.history.push(`/add-exercise/${userId}/${workoutId}/${date}`);
  }

  workoutNav = id => {
    
    this.props.history.push(`/workout/${id}`);
  }

  render() {
    const { classes, workouts, width } = this.props;
    const isSmallScreen = /xs|sm/.test(width);
    const buttonProps = {
      size: isSmallScreen ? "small" : "large"
    };

    return (
      workouts ?  
        workouts.map( workout => {
          return (
            <Paper key={shortid.generate()} className={classes.root}>
              <List className={classes.list}>
                <Query query={getWorkoutInfo} variables={{ 
                    filter: {
                      workoutId: {
                        eq: workout.id
                      }
                    }
                    }}>
                  {({ data }) => {
                    return <Fragment>
                      <ListSubheader disableSticky className={classes.subheader}>
                        <div className={classes.subHeaderText}>{workout.date ? moment(workout.date).format('MM-DD-YYYY') : 'N/A'}</div>
                        <div className={classes.subHeaderButton}>
                          <Button {...buttonProps}
                            onClick={ () => this.addExerciseNav(workout.id, workout.date) }
                            variant="contained"
                            color="primary"
                          >Add Exercise</Button>
                        </div>
                        <div className={classes.subHeaderButton}>
                        { data.listExercises && data.listExercises.items.length > 0 ?
                          <Button {...buttonProps}
                            onClick={ () => this.workoutNav(workout.id) }
                            variant="contained"
                            color="primary"
                          >View Details</Button> 
                          :
                          <Mutation mutation={DELETE_WORKOUT}
                            refetchQueries={() => {
                              return [{ query: getUserWorkouts }];
                            }}
                          >
                            {deleteWorkout => (
                              <Button {...buttonProps} 
                                color="primary" 
                                variant="contained"
                                onClick={() => deleteWorkout({ 
                                  variables: {
                                    input: {
                                      id: workout.id
                                    }
                                  }
                              })}>
                                Remove
                              </Button>
                            )}
                          </Mutation>
                        }
                        </div>
                      </ListSubheader>
                      { data.listExercises && data.listExercises.items ?
                        <WorkoutInfo exercises={data.listExercises.items} /> 
                        : null
                      }
                    </Fragment>
                    }
                  }
                </Query>
              </List>
            </Paper>
          )
        })
      : null
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withWidth(),
)(WorkoutList);

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import ExerciseInfo from './ExerciseInfo'
import { withRouter } from 'react-router';
import shortid from 'shortid';

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
      fontSize: '1.2rem',
    },
    minHeight: '4rem',
  },
  subHeaderText: {
    width: '50%'
  },
  subHeaderButton: {
    width: '50%',
    textAlign: 'end'
  },
  icon: {
    fontSize: '2.5rem'
  }
});

class ExerciseList extends Component {

  compareNav = (category, name, workoutId) => {
    this.props.history.push(`/${category}/${name}/${workoutId}`);
  }

  render() {
    const { classes, exercises } = this.props;
    return (
      exercises ?  
      exercises.map( exercise => {
          return (
            <Paper key={shortid.generate()} className={classes.root}>
              <List className={classes.list}>
                <ListSubheader disableSticky className={classes.subheader}>
                  <div className={classes.subHeaderText}>{`${exercise.name}`}</div>
                  <div className={classes.subHeaderButton}>
                  <Button
                    onClick={ () => this.compareNav(exercise.category, exercise.name, exercise.workoutId) }
                    variant="raised"
                    color="primary"
                  >Compare</Button>
                  </div>
                </ListSubheader>
                <ExerciseInfo exercise={exercise} />
              </List>
            </Paper>
          )
        })
      : <div>You have no exercises. Add some to get started.</div>
    )
  }
}

export default withRouter(withStyles(styles)(ExerciseList))

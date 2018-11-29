import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  listItem: {
    minHeight: '4rem'
  },
  listTextBox: {
    width: '30%'
  },
  selected: {
    fontSize: '1.25rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1rem',
    }
  }
});

const ExerciseInfo = ({ exercise = null, classes }) => {
  switch(exercise.category) {
    case 'weights' :
      return (
        <Fragment>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Category: ${exercise.category}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Body Part: ${exercise.bodyPart}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Sets: ${exercise.sets}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Reps: ${exercise.reps}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Weight: ${exercise.weight}`} />
          </ListItem>
        </Fragment>
      )
    case 'cardio' :
      return (
        <Fragment>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Category: ${exercise.category}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Body Part: ${exercise.bodyPart}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Miles: ${exercise.miles}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Minutes: ${exercise.minutes}`} />
          </ListItem>
        </Fragment>
      )
    case 'body-weight' :
      return (
        <Fragment>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Category: ${exercise.category}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Body Part: ${exercise.bodyPart}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Sets: ${exercise.sets}`} />
          </ListItem>
          <ListItem divider className={classes.listItem}>
            <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={`Reps: ${exercise.reps}`} />
          </ListItem>
        </Fragment>
      )
    default:
        return <div>This workout has no exercise info. Add some to get started.</div>
  }
}

export default withStyles(styles)(ExerciseInfo)




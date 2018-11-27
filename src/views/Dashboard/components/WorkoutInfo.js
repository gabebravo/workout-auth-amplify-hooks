import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import shortid from "shortid";

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

const WorkoutInfo = ({ exercises, classes }) => {
  return exercises ? exercises.map( exercise => { 
      return (
        <ListItem key={shortid.generate()} divider className={classes.listItem}>
          <ListItemText className={classes.listTextBox} classes={{ primary: classes.selected }} primary={exercise.name} />
        </ListItem>
      )
  }) : null
}

export default withStyles(styles)(WorkoutInfo)

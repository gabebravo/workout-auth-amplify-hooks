import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo'
import { ADD_EXERCISE_DEF } from '../../mutations';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../../shared/Header';
import { withRouter } from "react-router";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'weights',
  'cardio',
  'body weight',
];

const bodyParts = [
  'shoulders',
  'arms',
  'chest',
  'back',
  'abs',
  'legs',
];

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    marginTop: '1.3rem',
    minWidth: 353,
    maxWidth: 300,
    [theme.breakpoints.only('xs')]: {
      marginTop: '1.3rem',
      minWidth: 280,
      maxWidth: 300,
    },
  },
  modalStyles: {
    fontSize: '1.2rem',
    margin: '.5rem'
  }
});

const DEFAULT_STATE = {
  category: '',
  bodyPart: '',
  name: '',
  showModal: false,
  categoryError: false,
  cbodyPartError: false,
  nameError: false,
}

class ExerciseDef extends Component {
  state = DEFAULT_STATE;

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  homePageNav = () => {
    this.props.history.push('/');
  }

  submit = () => {
    if( !this.state.category ) {
      this.setState({ categoryError: true });
    }
    if( !this.state.bodyPart ) {
      this.setState({ bodyPartError: true });
    }
    if( !this.state.name ) {
      this.setState({ nameError: true });
    }
    else if( this.state.category && this.state.bodyPart && this.state.name ) {
      this.openModal()
    }
  }

  handleChange = event => {
    if( this.state[`${event.target.name}Error`] && event.target.value ) {
      this.setState({ [`${event.target.name}Error`]: false });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  resetState = () => {
    this.setState({ ...DEFAULT_STATE })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
      <CssBaseline />
      <Header />
      <div>
        <Button
          onClick={ () => this.homePageNav() }
          color="primary"
        >Back</Button>
      </div>
      <main className={classes.layout}>
      <Dialog
          open={this.state.showModal}
          onClose={this.closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Exercise Definition"}</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.modalStyles}>
              <span>{`category: ${this.state.category}`}</span>
            </DialogContentText>
            <DialogContentText className={classes.modalStyles}>
              <span>{`body part: ${this.state.bodyPart}`}</span>
            </DialogContentText>
            <DialogContentText className={classes.modalStyles}>
              <span>{`name: ${this.state.name}`}</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              Cancel
            </Button>
            <Mutation mutation={ADD_EXERCISE_DEF}>
              {createExerciseDef => (
                <Button color="primary" autoFocus 
                  onClick={() => createExerciseDef({ 
                    variables: {
                      input: {
                        category: this.state.category,
                        bodyPart: this.state.bodyPart,
                        name: this.state.name
                      }
                    }
                }).then( res => res && this.resetState() )}>
                  Save
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </Dialog>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PlaylistAddCheck />
          </Avatar>
          <Typography>Exercise Definition</Typography>
          <form className={classes.form}>
          <FormControl required error={this.state.categoryError}
            className={classes.formControl}>
            <InputLabel>Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                input={<Input name="category" />}
                MenuProps={MenuProps}
              >
                {categories.map(category => (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required error={this.state.bodyPartError}
              className={classes.formControl}>
            <InputLabel>Body Part</InputLabel>
              <Select
                value={this.state.bodyPart}
                onChange={this.handleChange}
                input={<Input name="bodyPart" />}
                MenuProps={MenuProps}
              >
                {bodyParts.map(bodyPart => (
                  <MenuItem
                    key={bodyPart}
                    value={bodyPart}
                  >
                    {bodyPart}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" error={this.state.nameError}
              required fullWidth>
              <InputLabel>Name</InputLabel>
              <Input name="name" autoComplete="name" autoFocus 
                value={this.state.name} onChange={this.handleChange} />
            </FormControl>
            <Button
              onClick={this.submit}
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Add Definition
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
    )
  }
}

ExerciseDef.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ExerciseDef));


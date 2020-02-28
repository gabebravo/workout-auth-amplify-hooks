import React from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import Header from '../shared/Header';
import { withRouter } from 'react-router-dom';
import { signInHooks } from '../hooks';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const SignIn = ({ classes, history }) => {
  const { fieldsObj, fieldSetter } = signInHooks();
  const {
    username,
    password,
    showConfirmation,
    user,
    authCode,
    showModal,
    modalMessage
  } = fieldsObj;

  function fieldHandler(evt) {
    const { name, value } = evt.target;
    fieldSetter({ ...fieldsObj, [name]: value });
  }

  function signIn() {
    Auth.signIn(username, password)
      .then(user => {
        fieldSetter({ ...fieldsObj, user, showConfirmation: true });
      })
      .catch(err => {
        fieldSetter({
          ...fieldsObj,
          showModal: true,
          modalMessage: err.message
        });
      });
  }

  function confirmSignIn() {
    Auth.confirmSignIn(user, authCode, user.challengeName)
      .then(user => {
        history.push('/dashboard');
      })
      .catch(err => console.log('error confirming signing in...: ', err));
  }

  function handleClose() {
    fieldSetter({ ...fieldsObj, showModal: false, modalMessage: '' });
  }

  return (
    <React.Fragment>
      {showModal ? (
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle>Oops...</DialogTitle>
          <DialogContent>
            <DialogContentText>{modalMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          {!showConfirmation ? (
            <>
              <Typography>Sign In</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    value={username}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={fieldHandler}
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    value={password}
                    name="password"
                    autoComplete="password"
                    type="password"
                    onChange={fieldHandler}
                  />
                </FormControl>
                <Button
                  onClick={() => signIn()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography>Sign In</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="authCode">Confirm Sign In</InputLabel>
                  <Input
                    value={authCode}
                    name="authCode"
                    autoComplete="authCode"
                    autoFocus
                    onChange={fieldHandler}
                  />
                </FormControl>
                <Button
                  onClick={() => confirmSignIn()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Confirm
                </Button>
              </form>
            </>
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));

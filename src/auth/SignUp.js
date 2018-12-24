import React from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { Avatar, Button, CssBaseline, FormControl, Input, 
  InputLabel, Paper, Typography, withStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import Header from '../shared/Header';
import { signUpHooks } from '../hooks'

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
  typography: {
    fontSize: '1.25rem'
  }
});

const phoneRenderFormat = number => {
  const phoneRegex = /(\d{0,3})(\d{0,3})(\d{0,4})/;
  let ph = number.replace(/\D/g, '').match(phoneRegex);
  ph = !ph[2] ? ph[1] : '(' + ph[1] + ') ' + ph[2] + (ph[3] ? '-' + ph[3] : '');
  return ph;
}

const SignUp = ({ classes, redirect }) => {

  const { fieldsObj, fieldSetter } = signUpHooks();
  const { username, password, email, phone_number, authCode, showConfirmation } = fieldsObj;

  function confirmSignUp() {
    Auth.confirmSignUp(username, authCode)
    .then(() => redirect(true))
    .catch(err => console.log('error confirming signing up: ', err))
  }

  function signUp(){
    const reformatPhone = phone_number.split('').reduce( (acc, char) => {
      if( char !== '(' && char !== ')' && char !== '-' && char !== ' ') {
        acc += char;
      }
      return acc;
    }, '')
  
    const finalPhone = `+01${reformatPhone}`;
    
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: finalPhone
      }
    })
    .then( fieldSetter({ ...fieldsObj, showConfirmation: true }) )
    .catch(err => console.log('error signing up: ', err))
  }

  function fieldHandler(evt) {
    const { name, value } = evt.target;
    const finalValue = name === 'phone_number' ? phoneRenderFormat(value) : value;
    fieldSetter({ ...fieldsObj, [name]: finalValue })
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          { !showConfirmation ? (
            <>
              <Typography>Sign Up</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input value={username} name="username" autoComplete="username" autoFocus
                    onChange={fieldHandler} />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input value={email} name="email" autoComplete="email" 
                    type="email" onChange={fieldHandler} />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input value={password} name="password" autoComplete="password"
                    type="password" onChange={fieldHandler} />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                  <Input value={phone_number} name="phone_number" autoComplete="phone_number" 
                    onChange={fieldHandler} />
                </FormControl>
                <Button
                  onClick={ () => signUp() }
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Save
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography>Sign Up</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" fullWidth required>
                  <InputLabel htmlFor="authCode">Confirmation Code</InputLabel>
                  <Input value={authCode} name="authCode" autoComplete="authCode" autoFocus
                    onChange={fieldHandler} />
                </FormControl>
                <Button
                  onClick={ () => confirmSignUp() }
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
  )
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);

import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../shared/Header';
import { withRouter } from "react-router-dom";

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
});

class SignUp extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    showConfirmation: false
  }

  fieldHandler = evt => {
    const { name, value } = evt.target;
    const finalValue = name === 'phone_number' ? this.phoneRenderFormat(value) : value;
    this.setState({ [name]: finalValue })
  }

  phoneRenderFormat = number => {
    const phoneRegex = /(\d{0,3})(\d{0,3})(\d{0,4})/;
    let ph = number.replace(/\D/g, '').match(phoneRegex);
    ph = !ph[2] ? ph[1] : '(' + ph[1] + ') ' + ph[2] + (ph[3] ? '-' + ph[3] : '');
    return ph;
  }

  signUp = () => {
    const { username, password, email, phone_number } = this.state
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
    .then(() => this.setState({ showConfirmation: true }))
    .catch(err => console.log('error signing up: ', err))
  }

  confirmSignUp = () => {
    console.log('state', this.state)
    Auth.confirmSignUp(this.state.username, this.state.authCode)
    .then(() => this.props.redirect(true))
    .catch(err => console.log('error confirming signing up: ', err))
  }

    render() {
      const { classes } = this.props;
      const { username, password, email, phone_number, authCode } = this.state;

      return (
        <React.Fragment>
        <CssBaseline />
        <Header />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            { !this.state.showConfirmation ? (
              <>
                <Typography>Sign Up</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input value={username} name="username" autoComplete="username" autoFocus
                      onChange={this.fieldHandler} />
                  </FormControl>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input value={email} name="email" autoComplete="email" 
                      type="email" onChange={this.fieldHandler} />
                  </FormControl>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input value={password} name="password" autoComplete="password"
                      type="password" onChange={this.fieldHandler} />
                  </FormControl>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                    <Input value={phone_number} name="phone_number" autoComplete="phone_number" 
                      onChange={this.fieldHandler} />
                  </FormControl>
                  <Button
                    onClick={ () => this.signUp() }
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
                      onChange={this.fieldHandler} />
                  </FormControl>
                  <Button
                    onClick={ () => this.confirmSignUp() }
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
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignUp));

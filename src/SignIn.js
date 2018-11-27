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
import Header from './shared/Header';
// import { withRouter } from "react-router-dom";

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

class SignIn extends Component {

    state = {
        username: '',
        password: '',
        showConfirmation: false,
        user: {},
        authCode: ''
    }

  fieldHandler = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value })
  }

  signIn = () => {
    Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        this.setState({ user, showConfirmation: true })
      })
      .catch(err => console.log('error signing in...: ', err))
  }

  confirmSignIn = () => {
    const { history } = this.props
    Auth.confirmSignIn(this.state.user, this.state.authCode, this.state.user.challengeName)
      .then(user => {
        history.push('/dashboard')
      })
      .catch(err => console.log('error confirming signing in...: ', err))
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
                <Typography>Sign In</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input value={username} name="username" autoComplete="username" autoFocus
                      onChange={this.fieldHandler} />
                  </FormControl>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input value={password} name="password" autoComplete="password"
                      type="password" onChange={this.fieldHandler} />
                  </FormControl>
                  <Button
                    onClick={ () => this.signIn() }
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
                <Typography>Sign Up</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="authCode">Confirm Sign In</InputLabel>
                    <Input value={authCode} name="authCode" autoComplete="authCode" autoFocus
                      onChange={this.fieldHandler} />
                  </FormControl>
                  <Button
                    onClick={ () => this.confirmSignIn() }
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
// export default withRouter(withStyles(styles)(SignUp));

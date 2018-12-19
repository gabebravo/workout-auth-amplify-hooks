import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends React.Component {

  state = {
    showSignIn: true,
    value: 2
  }

  switchState = showSignIn => {
    this.setState({ showSignIn })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { showSignIn } = this.state

    return (
      <div>
        {
          showSignIn ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        }
        <Tabs centered
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
        >
            <Tab label="Sign In" onClick={() => this.switchState(true)} />
            <Tab label="Sign Up" onClick={() => this.switchState(false)} />
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Authenticator);
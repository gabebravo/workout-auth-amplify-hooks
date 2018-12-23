import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends React.Component {

  state = {
    showSignIn: true
  }

  switchState = showSignIn => {
    console.log('showSignIn', showSignIn)
    this.setState({ showSignIn })
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { showSignIn } = this.state
    const tabIndex = showSignIn ? 0 : 1;
    console.log('tabIndex', tabIndex)

    return (
      <div>
        {
          showSignIn ? (
            <SignIn />
          ) : (
            <SignUp redirect={this.switchState} />
          )
        }
        <Tabs centered
            value={tabIndex}
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
// import { withRouter } from "react-router";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {

  homeNav = () => {
    console.log('go home')
    // this.props.history.push('/');
  }

  render() {
    const { classes, name = null } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <HomeIcon onClick={ () => this.homeNav()} />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Fitness Tracker
            </Typography>
            {
              name ? (
                <Typography variant="title" color="inherit">
                  <div color="inherit">{ name && `Hello, ${name}` }</div>
                </Typography>
              ) : null
            }
          </Toolbar>
        </AppBar>
      </div>
    )}

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

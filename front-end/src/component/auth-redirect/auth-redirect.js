import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';
import {ROOT_ROUTE} from '../../routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === routes.LOGIN_ROUTE || pathname === routes.SIGNUP_ROUTE ||
        pathname === routes.ROOT_ROUTE) {
      if (token) {
        destinationRoute = routes.DASHBOARD_ROUTE;
      }
    } else if (!token) {
      destinationRoute = routes.ROOT_ROUTE;
    }
    return (
        <div>
          { destinationRoute ? <Redirect to={ destinationRoute }/>: undefined }
        </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class NavigationBar extends React.Component {

  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul role="nav" className="pull-right nav navbar-nav">
        <li><Link to="/user/dashboard">Dashboard</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul role="nav" className="pull-right nav navbar-nav">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    );

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">BookMyShow</Link>
          </div>
          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps, { logout } )(NavigationBar);

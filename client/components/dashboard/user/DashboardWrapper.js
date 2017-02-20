import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class DashboardWrapper extends React.Component {

  render(){
    let styles = {
      sideBar : {
        backgroundColor: '#E8E8E8',
        minHeight: '500px'
      },
      content: {
        backgroundColor: '#F8F8F8',
        minHeight: '500px'
      },
      profilePic: {
        width: '100px',
        margin: '0 auto',
        display: 'block'
      }
    };
    let user = this.props.auth.user;
    return (
      <div>
        <div className="col-md-3 sidebar" style={styles.sideBar}>
          <div style={{ padding: '15px', textAlign: 'center' }}>
            <img className="img-circle" style={styles.profilePic} src="/images/profile-pic.png" alt="Profile Picture" />
            <h5>{`${user.firstName} ${user.lastName}`}</h5>
            <small><Link to="/user/dashboard/change-password">Change Password</Link></small>
          </div>
          <hr/>
          <ul className="nav nav-sidebar">
            <li><Link to="/user/dashboard">Dashboard Home</Link></li>
            <li><Link to="/user/dashboard/tv-shows">TV Shows</Link></li>
          </ul>
        </div>
        <div className="col-md-9" style={styles.content}>
          {this.props.children}
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }

}

DashboardWrapper.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps)(DashboardWrapper);

import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';

class ChangePasswordPage extends React.Component {

  render(){
    return (
      <div className="col-md-6 col-md-offset-3">
        <h3 className="text-center">Change Password</h3>
        <hr/>
        <ChangePasswordForm/>
      </div>
    );
  }

}

export default ChangePasswordPage;

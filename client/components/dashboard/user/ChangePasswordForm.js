import React from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';

import { connect } from 'react-redux';
import { changePassword } from '../../../actions/changePasswordActions';

class ChangePasswordForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      isLoading: false,
      errors: {},
      userId: this.props.user.id
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    let ctx = this;
    this.setState({ isLoading: true, errors: {} });
    var temp = this.props.changePassword(this.state);
    console.log('T T T T:', temp);
    temp.then(
      (res) => {
        ctx.setState({ isLoading: false});
        console.log('Response:', res);
      },
      function(err){
        console.log('Errrrrr: ',err);
        ctx.setState({ isLoading: false, errors: err.response.data.errors });
      }
    );
  }

  render(){
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        { (errors.form) && <div className='alert alert-danger'>{errors.form}</div> }

        <TextFieldGroup
          type='password'
          field='currentPassword'
          label='Current Password'
          value={this.state.currentPassword}
          onChange={this.onChange}
          error={errors.currentPassword}
        />

        <TextFieldGroup
          type='password'
          field='newPassword'
          label='New Password'
          value={this.state.newPassword}
          onChange={this.onChange}
          error={errors.newPassword}
        />

        <div className='field-group'>
            <button className='btn btn-primary btn-lg' disabled={this.state.isLoading}>Change it!</button>
        </div>

      </form>
    )
  }
}

ChangePasswordForm.propTypes = {
  changePassword: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);

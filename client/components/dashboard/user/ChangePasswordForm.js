import React from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';

class ChangePasswordForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
  }

  render(){
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          field='currentPassword'
          label='Current Password'
          value={this.state.currentPassword}
          onChange={this.onChange}
          error={errors.currentPassword}
        />

        <TextFieldGroup
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

export default ChangePasswordForm;

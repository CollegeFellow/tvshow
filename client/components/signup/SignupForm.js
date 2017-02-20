import React from 'react';
import classnames from 'classnames';

import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userEmail: '',
      password: '',
      passwordConfirm: '',
      isLoading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }

  isValid(){
    const { errors, isValid } = validateInput(this.state);
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Welcome! You\'ve signed up successfully.'
          });
          this.context.router.push('/user/dashboard');
        },
        (err) => { console.log(err); this.setState({ errors: err.response.data, isLoading: false }); }
      );
    }
  }

  render(){
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h3>Signup Now!!</h3>
        <hr/>

        <TextFieldGroup
          error={errors.firstName}
          label="First Name"
          onChange={this.onChange}
          value={this.state.firstName}
          field="firstName"
        />

        <TextFieldGroup
          error={errors.lastName}
          label="Last Name"
          onChange={this.onChange}
          value={this.state.lastName}
          field="lastName"
        />

        <TextFieldGroup
          error={errors.userEmail}
          label="Email"
          onChange={this.onChange}
          value={this.state.userEmail}
          field="userEmail"
          type="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirm}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirm}
          field="passwordConfirm"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>

      </form>
    )
  }

}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;

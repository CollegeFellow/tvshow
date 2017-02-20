import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if( Validator.isEmpty(data.userEmail) ){
    errors.userEmail = 'This field is required';
  }
  else if(!Validator.isEmail(data.userEmail) ){
    errors.userEmail = 'Email is invalid';
  }
  if( Validator.isEmpty(data.firstName) ){
    errors.firstName = 'This field is required';
  }
  if( Validator.isEmpty(data.lastName) ){
    errors.lastName = 'This field is required';
  }
  if( Validator.isEmpty(data.password) ){
    errors.password = 'This field is required';
  }
  if( Validator.isEmpty(data.passwordConfirm) ){
    errors.passwordConfirm = 'This field is required';
  }
  else if(!Validator.equals(data.password, data.passwordConfirm) ){
    errors.passwordConfirm = 'Passwords must be same';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

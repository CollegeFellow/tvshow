import express from 'express';
import commonValidations from '../shared/validations/signup.js';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';
import Validator from 'validator';

import User from '../models/user';

let router = express.Router();

/******************************************************************************
* User Signup Route START
*******************************************************************************/

function validateInput(data, otherValidations){
  let { errors } = otherValidations(data);

  return User.where({ email: data.userEmail }).fetch().then(user => {
    if(user) { errors.userEmail = 'The email entered already exists'; }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}


router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if(isValid){
      const { firstName, lastName, userEmail, password } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        'firstName': firstName,
        'lastName': lastName,
        'email': userEmail,
        'password_digest': password_digest
      }, { hasTimestamps: true }).save()
        .then(function(user) {
          const token = jwt.sign({
            id: user.get('id'),
            email: user.get('email'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName')
          }, config.jwtSecret);
          return res.json({ success: true, token });
        })
        .catch(function (err){
          return res.status(500).json({ errors: err });
        });
    }
    else{
      res.status(400).json(errors);
    }
  });
});

/******************************************************************************
* Change Password Route END
*******************************************************************************/



/******************************************************************************
* Change Password Route START
*******************************************************************************/

function validateChangePassword(data, errors){
  return new Promise (
    function (resolve, reject){
      let { userId, currentPassword, newPassword } = data;

      if( Validator.isEmpty(newPassword) ){
        errors.newPassword = 'This field is required';
      }

      User.where({id:userId}).fetch().then((user) => {
        if( Validator.isEmpty(currentPassword) ){
          errors.currentPassword = 'This field is required';
        }
        else{
          if(user) {
            if(!bcrypt.compareSync(currentPassword, user.get('password_digest'))){
              errors.currentPassword = 'Invalid current password';
            }
          }
          else{
            errors.currentPassword = 'No such user';
          }
        }
        resolve('success');
      });
    }
  );
}

router.post('/change-password', (req, res) => {
  let errors = {};
  validateChangePassword(req.body, errors).then(
    function (){
      let isValid = isEmpty(errors);

      if(isValid){
        // Validation Succesfull - Change Password
        const password_digest = bcrypt.hashSync(req.body.newPassword, 10);
        new User({id:req.body.userId})
          .save({'password_digest':password_digest})
          .then(
            (user) => {
              let tokenObject = {
                id: user.get('id'),
                email: user.get('email'),
                firstName: user.get('firstName'),
                lastName: user.get('lastName')
              };
              console.log('U S E R : ', tokenObject);

              const token = jwt.sign(tokenObject, config.jwtSecret);
              res.status(200).json({ success: true, token });
            },
            () => {
              res.status(500).json({ success: false, errors: { form: 'Something went wrong!! QUERY GADBAD!!'} });
            }
          )
          .catch(function(err){
            res.status(500).json({ success: false, errors: { form: 'Something went wrong!! CAUGHT!!'} });
          });
      }
      else{
        res.status(400).json({success: false, errors});
      }
    }
  ).catch(function(err){
    res.status(500).json({success: false, errors: { form: 'Something went wrong.', err: err} });
  });

});

/******************************************************************************
* Change Password Route END
*******************************************************************************/

export default router;

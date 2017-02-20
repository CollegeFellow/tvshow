import express from 'express';
import commonValidations from '../shared/validations/signup.js';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

let router = express.Router();

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

export default router;

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const { userEmail, password } = req.body;

  User.where({ email: userEmail }).fetch().then((user) => {
    if(user){
      if(bcrypt.compareSync(password, user.get('password_digest'))){
        const token = jwt.sign({
          id: user.get('id'),
          email: user.get('email'),
          firstName: user.get('firstName'),
          lastName: user.get('lastName')
        }, config.jwtSecret);
        res.json({token});
      }
      else{
        res.status(401).json({ errors: { form: 'Invalid credentials' } });
      }
    }
    else{
      res.status(401).json({ errors: { form: 'Invalid credentials' } });
    }
  });
});

export default router;

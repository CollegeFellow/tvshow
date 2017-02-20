import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './authActions';

export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('/api/users', userData).then(
      res => {
        const token = res.data.token;
        dispatch(setCurrentUser(jwtDecode(token)));
      }
    );
  }
}

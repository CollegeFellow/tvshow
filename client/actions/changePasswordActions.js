import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './authActions';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function changePassword(data){
  return dispatch => {
    return axios.post('/api/users/change-password', data).then(
      res => {
        console.log('Res:', res, 'Dispatch:', dispatch);

        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        let userToken = setCurrentUser(jwtDecode(token));
        console.log('userToken', userToken);
        dispatch(userToken);
      }
    );
  }
}

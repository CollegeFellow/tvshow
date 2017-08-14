import axios from 'axios';

import { SET_NOW_SHOWING } from './types';

export function setNowShowing(){
  let nowShowing = [];

  console.log('Set now showing . . .');

  axios.get('/api/movies')
  .then((response) => {
    nowShowing = response.data.BookMyShow.Events;
  })
  .catch((err) => {
    console.log('REDUCER ERRORRRRRRRRRRR',err);
  });

  return {
    type: SET_NOW_SHOWING,
    nowShowing
  }
}

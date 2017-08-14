import { SET_NOW_SHOWING } from '../actions/types';

const initialState = {
  nowShowing: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NOW_SHOWING:
      return {
        nowShowing: action.nowShowing
      }
      break;

    default: return state;

  }
}

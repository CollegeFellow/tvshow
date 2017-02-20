import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {} ) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          message: action.message.text,
          type: action.message.type
        }
      ]
      break;

    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if(index >= 0){
        return [
          ...state.slice(0,index),
          ...state.slice(index+1)
        ]
      }
      else
      {
        return state;
      }
      break;

    default: return state;

  }
}

import {
  SET_USER,
  ADD_USER_LAYER,
  Action,
} from '../types';

export default (state : any, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_USER_LAYER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
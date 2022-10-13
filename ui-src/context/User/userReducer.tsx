import {
  SET_USER,
  ADD_FRAME,
  CLEAR_FRAME,
  Action,
} from '../types';

export default (state : any, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_FRAME:
      return {
        ...state,
        selectedFrame: action.payload,
      };
    case CLEAR_FRAME:
      return {
        ...state,
        selectedFrame: null,
      };
    default:
      return state;
  }
}
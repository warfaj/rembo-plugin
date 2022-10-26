import React, { ReactNode, useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  SET_USER,
  INITIAL_STATE,
  ADD_FRAME,
  CLEAR_FRAME,
} from '../types';

const checkRemboId = async (id : string) => {
  return await fetch(`http://localhost:3000/api/frame/${id}`).then((res) => {return res.status === 200});
}

const UserState = (props : any) => {

  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUser = async (id : string) => {
    const validRemboId = await checkRemboId(id);
    console.log(validRemboId);
    if (validRemboId) {
      parent.postMessage(
        { pluginMessage: { type: "set-rembo-id", rembo_id: id } },
        "*"
      );
    
    dispatch({
      type: SET_USER,
      payload: id,
    });
    }
    return validRemboId;
  }


  const addFrame = async (data : any) => {
    dispatch({
      type: ADD_FRAME,
      payload: data,
    });
  }

  const clearFrame = () => {
    dispatch({
      type: CLEAR_FRAME,
      payload: null,
    });
  }


  return <UserContext.Provider
    value={{
      user: state.user,
      selectedFrame: state.selectedFrame,
      setUser,
      addFrame,
      clearFrame,
    }} 
  > 
  {props.children}
  </UserContext.Provider>
}

export default UserState
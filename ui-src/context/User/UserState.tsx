import React, { ReactNode, useReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import {
  SET_USER,
  INITIAL_STATE,
  ADD_FRAME,
  CLEAR_FRAME,
} from '../types';

const getUser = async (id : string) => {
  //const res = await axios.get(`http://localhost:3001/users/${id}`);
  // do some error checking here

  const res = { data: { id: '123', first_name: 'John' } }
  return res.data;

}

const UserState = (props : any) => {

  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUser = async (id : string) => {
    const user = await getUser(id);
    dispatch({
      type: SET_USER,
      payload: user,
    });
  }

  const addFrame = (layer : any) => {
    dispatch({
      type: ADD_FRAME,
      payload: layer,
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
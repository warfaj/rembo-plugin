import React, { ReactNode, useReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import {
  SET_USER,
  ADD_USER_LAYER,
  INITIAL_STATE,
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


  return <UserContext.Provider
    value={{
      user: state.user,
      selectedFrame: state.selectedFrame,
      setUser,
    }} 
  > 
  {props.children}
  </UserContext.Provider>
}

export default UserState
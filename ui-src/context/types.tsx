export const SET_USER = 'SET_USER';
export const ADD_USER_LAYER = 'ADD_USER_LAYER';

export interface Action {
  type: string;
  payload: any;
}

export interface User {
  id: string;
  first_name: string;
}

export interface UserContextData {
  user: User | null;
  selectedFrame: any;
  setUser: (id: string) => void;
}

export const INITIAL_STATE : UserContextData = {
  user: null,
  selectedFrame: null,
  setUser: () => {},
}
export const SET_USER = 'SET_USER';
export const ADD_FRAME = 'ADD_FRAME';
export const CLEAR_FRAME = "CLEAR_FRAME";

export interface Action {
  type: string;
  payload: any;
}

export interface User {
  id: string;
}


export interface UserContextData {
  user: User | null;
  selectedFrame: any;
  setUser: (id: string) => Promise<boolean>;
  addFrame: (layer: any) => void;
  clearFrame: () => void;
}

export const INITIAL_STATE : UserContextData = {
  user: null,
  selectedFrame: null,
  setUser: async () => false,
  addFrame: () => {},
  clearFrame: () => {},
}
import { createContext } from "react";
import { UserContextData, INITIAL_STATE } from "../types";

const userContext = createContext<UserContextData>(
  INITIAL_STATE
);

export default userContext;
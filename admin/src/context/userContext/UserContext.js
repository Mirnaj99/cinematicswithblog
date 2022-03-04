import UserReducer from "./UserReducer";
import { createContext, useReducer } from "react";

const ININTIAL_STATE = {
  users: [],
  isFetching: false,
  error: false,
};

export const UserContext = createContext(ININTIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, ININTIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

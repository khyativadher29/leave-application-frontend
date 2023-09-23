import {
    LOGIN_SUCCESS,
  } from "./action";
  
  const initialState = {
    user: null,
    token: null,
    cars: [],
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
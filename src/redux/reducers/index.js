import actionTypes from "../constants/actionTypes";
import jwt from 'jsonwebtoken';

const userState=null;

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return state = action.payload;
    case actionTypes.LOGOUT:
      return (state = null);
    default:
      return state;
  }
};


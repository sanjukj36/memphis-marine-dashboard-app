import { LOGIN_SUCCESS, LOGOUT, SET_ADMIN } from '../Actions/authActions';

const initialState = {
  isLoggedIn: false,
  token: null,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
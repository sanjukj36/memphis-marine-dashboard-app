export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const SET_ADMIN = 'SET_ADMIN';

export const setAdmin = (isAdmin) => ({
  type: SET_ADMIN,
  payload: isAdmin,
});

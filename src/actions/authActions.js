export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const register = (userData) => {
  return (dispatch) => {
    dispatch(registerSuccess(userData));
  };
};

export const login = (userData) => {
  return (dispatch) => {
    dispatch(loginSuccess(userData));
  };
};

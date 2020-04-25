//create an enum
const UserActionTypes = Object.freeze({
  SET_CURR_USER: Symbol('setting current user'),
  CHECK_USER_SESSION: Symbol('checking user session'),

  GOOGLE_SIGNIN_START: Symbol('starting google signin'),
  EMAIL_SIGNIN_START: Symbol('starting email signin'),
  SIGN_IN_SUCCESS: Symbol('succeeded signing in'),
  SIGN_IN_FAILURE: Symbol('failed signing in'),
  
  SIGN_OUT_START: Symbol('signing out!'),
  SIGN_OUT_SUCCESS: Symbol('succeded signing out'),
  SIGN_OUT_FAILURE: Symbol('could not sign out'),
});

export default UserActionTypes
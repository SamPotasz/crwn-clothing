//create an enum
const UserActionTypes = Object.freeze({
  SET_CURR_USER: Symbol('setting current user'),
  GOOGLE_SIGNIN_START: Symbol('starting google signin'),
  EMAIL_SIGNIN_START: Symbol('starting email signin'),
  SIGN_IN_SUCCESS: Symbol('succeeded signing in'),
  SIGN_IN_FAILURE: Symbol('failed signing in'),
  CHECK_USER_SESSION: Symbol('checking user session')
});

export default UserActionTypes
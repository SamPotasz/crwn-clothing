import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURR_USER,
    payload: user
})

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START,
})

export const emailSignInStart = emailAndPasswordObj => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPasswordObj
})

export const SignInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const SignInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
})

export const CheckUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
})

export const SignOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
})

export const SignOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const SignOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
})

// export const emailSignInSuccess = user => ({
//   type: UserActionTypes.EMAIL_SIGNIN_SUCCESS,
//   payload: user
// })

// export const emailSignInFailure = error => ({
//   type: UserActionTypes.EMAIL_SIGNIN_FAILURE,
//   payload: error
// })
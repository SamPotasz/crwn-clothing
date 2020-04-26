import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { SignInSuccess, SignInFailure, SignOutFailure, SignOutSuccess, SignUpFailure, SignUpSuccess } from './user.actions';

/**
 * 
 * @param {user object returned from async sign-in call} userAuth 
 */
function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();

    yield put(
      SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  }
  catch ( error ) {
    yield put(SignInFailure( error ));
  }
}

function* signInWithGoogle() {
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth( user )
  }
  catch ( error ) {
    yield put(SignInFailure( error ));
  }
}

function* signInWithEmail({ payload: { email, password }}) {
   try {
      const { user } = yield auth.signInWithEmailAndPassword( email, password );
      yield getSnapshotFromUserAuth( user )
    } 
    catch ( error ) {
      yield put( SignInFailure ( error ));
    }
}

function* signInFromSignUp({ payload: { user, additionalData }}) {
  try {
    yield getSnapshotFromUserAuth(user, additionalData)
  }
  catch ( error ) {
    yield put( SignInFailure( error ));
  }
}

/**
 * Executed onCheckUserSession.
 */
function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;  //not signed in, return
    yield getSnapshotFromUserAuth( userAuth );
  } 
  catch( error ) {
    yield put( SignInFailure( error ));
  }
}

/**
 * Generator for sign out start listener
 */
function* startSignOut() {
  try {
    yield auth.signOut();
    yield put( SignOutSuccess() );
  }
  catch ( error ){
    yield put( SignOutFailure( error ));
  }
}

/**
 * Generator for sign UP start listener
 */
function* startSignUp({ payload: {email, password, displayName }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword( email, password );
    yield put( SignUpSuccess({ user, additionalData: { displayName }}))
  } 
  catch ( error ) {
    yield put( SignUpFailure( error ))
  }
}

//listen for GOOGLE_SIGNIN_START and trigger actual action in reducer
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail );
}

/**
 * Listener for checking if a user auth persists in a session.
 * Triggered on app re-render.
 */
export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated
  )
}

/**
 * Listener for user initiating sign-out process.
 * Triggered by clicking sign out button
 * Initiates API call
 */
export function* onSignOutStart() {
  yield takeLatest( UserActionTypes.SIGN_OUT_START, startSignOut )
}

/**
 * Listener for user submitting the signup form.
 */
export function* onSignUpStart() {
  yield takeLatest( UserActionTypes.SIGN_UP_START, startSignUp )
}

export function* onSignUpSuccess() {
  yield takeLatest( UserActionTypes.SIGN_UP_SUCCESS, signInFromSignUp )
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}
import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { SignInSuccess, SignInFailure } from './user.actions';

/**
 * 
 * @param {user object returned from async sign-in call} userAuth 
 */
function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
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

//listen for GOOGLE_SIGNIN_START and trigger actual action in reducer
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail );
}

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated
  )
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
  ])
}
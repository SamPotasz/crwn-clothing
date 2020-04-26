import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { ClearCart } from './cart.actions';

function* clearCartOnSignOut() {
  yield put(ClearCart());
}

export function* onSignOutSucces() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield( all( [
    call(onSignOutSucces),
  ]))
}
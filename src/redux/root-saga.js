import { all, call } from 'redux-saga/effects';

import { fetchCollectionStartSaga } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

/**
 * put all the sagas we want to run in here.
 * all() allows us to run sagas concurrently
 */
export default function* rootSaga() {
  yield all([
    call(fetchCollectionStartSaga),
    call(userSagas),
  ])
}
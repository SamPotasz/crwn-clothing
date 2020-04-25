/**
 * hold all the sagas for our shop
 */

import SHOP_ACTION_TYPES from './shop.types'

//takeEvery listens for every action of a given type
//takeLatest cancels calls that came in since last firing
import { takeLatest, call, put } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {fetchCollectionsError, fetchCollectionsSuccess } from './shop.actions'

 /**
  * Generator function that's executed by takeEvery
  */
export function* fetchCollectionsAsync() {
	try{
		const collectionRef = firestore.collection('collections');

		//wait to get the results from collectionRef
		const snapshot = yield collectionRef.get();
		
		//want to yield this in case this takes longer than expected
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap)); //equiv to dispatch
	} 
	catch (error) {
		yield put(fetchCollectionsError(error.message));
	}

	// collectionRef
	//     .get()
	//     .then(snapshot => {
	//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
	//         dispatch(fetchCollectionsSuccess(collectionsMap));
	// })
	// .catch(error => dispatch(fetchCollectionsError(error.message)));
}

export function* fetchCollectionStartSaga() {
	yield takeLatest(
		SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START, 
		fetchCollectionsAsync)
}
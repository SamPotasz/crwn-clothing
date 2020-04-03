import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares = [logger];

//instantiate the redux store!
const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;

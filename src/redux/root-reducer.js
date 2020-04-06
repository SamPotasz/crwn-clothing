import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    //use local storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], //what reducers we want to persist. Don't need user because firebase is doing it
}

const rootReducer =  combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
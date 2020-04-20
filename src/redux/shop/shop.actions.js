import SHOP_ACTION_TYPES from './shop.types';

//action to update the collections in the shop
export const updateCollections = (collectionsMap) => ({
    type: SHOP_ACTION_TYPES.UPDATE_COLLECTIONS,
    payload: collectionsMap
})
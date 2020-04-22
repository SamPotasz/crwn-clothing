import { createSelector } from 'reselect';

export const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop => shop.collections)
)
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop => shop.isFetching)
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
)

//TODO: move away from collections.find with normalization
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
);

//boolean whether or not collections is null
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)

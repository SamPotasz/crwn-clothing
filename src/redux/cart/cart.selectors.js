import { createSelector } from 'reselect';

//input selector. function takes the whole state and returns 1-layer deep
const selectCart = state => state.cart;

//
export const selectCartItems = createSelector(
    [selectCart],
    (cart => cart.cartItems)
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce( 
        (prevQuantity, cartItem) => prevQuantity + cartItem.quantity,
        0 )
)
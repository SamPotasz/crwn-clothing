import { CART_ACTION_TYPES } from './cart.types';

/**
 * Changes visibility of cart dropdown in UI
 */
export const toggleCartHidden = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_HIDDEN,
})

//increases quantity of item in cart by one
export const addItem = (item) => ({
  type: CART_ACTION_TYPES.ADD_ITEM,
  payload: item
})

/**
 * Removes a single quantity of item from the cart
 * @param {Item object to reduce quantity of} item 
 */
export const removeItem = (item) => ({
  type: CART_ACTION_TYPES.REMOVE_ITEM,
  payload: item
})

/**
 * Removes all of a single object from the cart
 * @param {item object to clear} item 
 */
export const clearItem = (item) => ({
  type: CART_ACTION_TYPES.CLEAR_ITEM,
  payload: item
})

/**
 * Removes everything from the cart
 */
export const ClearCart = () => ({
  type: CART_ACTION_TYPES.CLEAR_CART,
})
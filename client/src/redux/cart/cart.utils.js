export const addItemToCart = (prevCart, toAdd) => {
    const matchingCartItem = prevCart.find(
        cartItem => cartItem.id === toAdd.id
    );

    if(matchingCartItem) {
        return prevCart.map(cartItem => 
            cartItem.id === toAdd.id ? { 
                ...cartItem,
                quantity: cartItem.quantity + 1
             }
             : cartItem )
    }

    //else, no matching item, this is a new item for the cart. set quantity.
    return [...prevCart, {...toAdd, quantity: 1}]
};

//if matching and quantity of 1, remove it.
//if quantity greater than 1, decrease quantity.
//if not matching, return previous cart
export const removeItemFromCart = (prevCart, toRemove) => {
    const matchingCartItem = prevCart.find(
        cartItem => cartItem.id === toRemove.id
    );

    if(matchingCartItem) {
        if(matchingCartItem.quantity === 1) 
            return prevCart.filter(
                cartItem => cartItem.id !== toRemove.id)
        

        return prevCart.map(cartItem => 
             cartItem.id === toRemove.id ? {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                }
            : cartItem )
    }

    console.warn('trying to remove from an item that was not in cart');
    return prevCart;
};
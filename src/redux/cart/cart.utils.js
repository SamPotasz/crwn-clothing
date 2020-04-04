export const addItemToCart = (prevCart, toAdd) => {
    const matchingCartItem = prevCart.find(
        cartItem => cartItem.id === toAdd.id
    );

    if(matchingCartItem) {
        return prevCart.map(cartItem => 
            cartItem.id == toAdd.id ? { 
                ...cartItem,
                quantity: cartItem.quantity + 1
             }
             : cartItem )
    }

    //else, no matching item, this is a new item for the cart. set quantity.
    return [...prevCart, {...toAdd, quantity: 1}]
}
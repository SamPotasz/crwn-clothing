import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';
import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

/*
 * component which displays quantity of a single item on checkout page
 * also has buttons which can dispatch calls to increase or decrease quanity
 */
 const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    return (
     <div className='checkout-item'>
        <div className='image-container'>
            <img alt={name} src={imageUrl}/>
        </div> 
        <span className='name'>{name}</span>
        <div className='quantity'>
            <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow'  onClick={() => addItem(cartItem)}>&#10095;</div>
        </div>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => clearItem(cartItem)}>
            &#10005;</div>
     </div>
    )
}

 const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    clearItem: (item) => dispatch(clearItem(item)),
 })

 export default connect(null, mapDispatchToProps)(CheckoutItem);
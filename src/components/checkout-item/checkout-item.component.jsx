import React from 'react';

import './checkout-item.styles.scss';

/*
 * component which displays quantity of a single item on checkout page
 * also has buttons which can dispatch calls to increase or decrease quanity
 */

 const CheckoutItem = ({cartItem: { imageUrl, name, price, quantity }}) => (

     <div className='checkout-item'>
        <div className='image-container'>
            <img alt={name} src={imageUrl}/>
        </div> 
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
        <span className='quantity'>{quantity}</span>
        {/* <div className='remove-button'>&#10005;</div> */}
     </div>
 )

 export default CheckoutItem;
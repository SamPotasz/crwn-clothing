import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({bananarama}) => (
    <div className = 'cart-icon' onClick={bananarama}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
)

//binds 
const mapDispatchToProps = (dispatch) => ({
    bananarama: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon);
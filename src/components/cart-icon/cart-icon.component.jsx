import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({bananarama, totalQuantity}) => (
    <div className = 'cart-icon' onClick={bananarama}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{totalQuantity}</span>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    bananarama: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    totalQuantity: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
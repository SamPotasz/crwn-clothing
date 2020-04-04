import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = ({hidden}) => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <CustomButton>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    hidden: state.cart.hidden
})

export default connect(mapStateToProps)(CartDropdown);
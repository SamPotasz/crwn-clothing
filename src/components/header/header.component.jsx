import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';  //HOC that gives access to redux reducers/store

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';

import './header.styles.scss';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden}) => (
    
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
        </Link>
        
        <div className='options'>
            <Link className='option' to='/shop'>
                Shop
            </Link>
            <Link className='option' to='/shop'>
                Contact
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
                : 
                <Link to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown /> }
    </div>
)

//state is top-level root reducer
const mapStateToProps = ({ user: {currentUser}, cart: {hidden}}) => ({
    currentUser, 
    hidden
})

export default connect(mapStateToProps)(Header);
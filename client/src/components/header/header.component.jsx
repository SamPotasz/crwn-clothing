import React from 'react';
import { connect } from 'react-redux';  //HOC that gives access to redux reducers/store
import { createStructuredSelector } from 'reselect';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { SignOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, OptionLink, OptionsContainer, LogoContainer } from './header.styles.jsx';

const Header = (props) => {
  const { currentUser, hidden, dispatchSignOutStart } = props;

   return( <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        
        <OptionsContainer>
            <OptionLink to='/shop'>
                Shop
            </OptionLink>
            {/* <OptionLink to='/shop'>
                Contact
            </OptionLink> */}
            {
                currentUser ? 
                <OptionLink as='div' onClick={dispatchSignOutStart}>SIGN OUT</OptionLink> 
                : 
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown /> }
    </HeaderContainer>
   )
}

//createStructuredSelector will automatically pass state into the functions below
const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser, 
    hidden: selectCartHidden,
})

const mapDispatchToProps = dispatch => ({
  dispatchSignOutStart: () => dispatch(SignOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
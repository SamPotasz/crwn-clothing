import React, { useEffect } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/hompepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors'
import { CheckUserSession } from './redux/user/user.actions';

const App = (props) => {
  
  const { checkUserSession, currentUser } = props;
  
  useEffect(() => {
    
    checkUserSession();

    // addCollectionAndDocuments('collections', 
    //   collectionsArray.map(({title, items}) => ({title, items})))
    
    // return () => {
    //   unsubscribe();
    // }
  }, [])

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route exact path='/signin' render={() => 
          currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
      </Switch>
    </div>
  );
    
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(CheckUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
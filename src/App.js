import React, { useEffect } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/hompepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

const App = ({ setCurrentUser, currentUser }) => {
    
  // let unsubscribeFromAuth = null;

  useEffect(() => {
    //when onAuthStateChanged is called, it returns its closing method. save that, call on unMount
    const unsubscribe = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        //save to firebase
        const userRef = await createUserProfileDocument(userAuth);

        //add listener for data changes
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        });
      }

      setCurrentUser(userAuth);
      
      // addCollectionAndDocuments('collections', 
      //   collectionsArray.map(({title, items}) => ({title, items})))
    
      return () => {
        unsubscribe();
      }
      })
  }, [])

  /*
  componentDidMount() {

    //when onAuthStateChanged is called, it returns its closing method. save that, call on unMount
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        //save to firebase
        const userRef = await createUserProfileDocument(userAuth);

        //add listener for data changes
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        });
      }

      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', 
      //   collectionsArray.map(({title, items}) => ({title, items})))
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  */

    return (
      <div>
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

//dispatch is an action object. so 
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
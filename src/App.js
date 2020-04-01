import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/hompepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null,
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    //when onAuthStateChanged is called, it returns its closing method. save that, call on unMount
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        //save to firebase
        const userRef = await createUserProfileDocument(userAuth);

        //check if data changed
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      else  //yihua doesn't have this else :-/ i guess it's a little redundant
      {
        this.setState({currentUser: userAuth});
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
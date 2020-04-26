import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const publishableKey = 'pk_test_trpsYhm2w6757tR6jjTNka5A008z7UyMjA';

//https://github.com/azmenak/react-stripe-checkout
const StripeButton = ({ usd }) => {
  const cents = usd * 100;  //stripe needs payment amount in cents

  const onToken = token => {
    axios({
      url: 'payment', //uses current url and appends this param
      method: 'post',
      data: {
        amount: cents,
        token
      }
    })
    .then( response => {
      alert('Payment successful')
    })
    .catch( error => {
      console.log('Payment error: ', JSON.parse(error));
      alert( 'There was an issue with your payment.\nPlase make sure you use the test credit card info provided on the page.' );
    })
  }
  
  return (<StripeCheckout 
    label='Pay Now'
    name='CRWN Clothing'
    billingAddress
    shippingAddress
    image='https://sendeyo.com/up/d/f3eb2117da'
    description={`Your total is $${usd}`}
    amount={cents}
    panelLabel='Pay Now'
    token={onToken} 
    stripeKey={publishableKey}
  />)
}

export default StripeButton;
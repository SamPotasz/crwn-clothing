import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const publishableKey = 'pk_test_trpsYhm2w6757tR6jjTNka5A008z7UyMjA';

const onToken = token => {
    alert("Payment successful!");
}

//https://github.com/azmenak/react-stripe-checkout
const StripeButton = ({ usd }) => {
    const cents = usd * 100;
    
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
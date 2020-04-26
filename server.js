const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//adds file to process.env
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;  //heroku sets port env

app.use( bodyParser.json() ); //process any request's body as json
app.use( bodyParser.urlencoded( { extended: true })); //escapes url strings

app.use( cors() );  //allow cross-origin requests

//serve the client application!
if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 
    path.join( __dirname, 'client/build' )));

  //base get route - serve index.html
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,
       'client/build', 'index.html'));
  });  
}

app.listen(port, error => {
  if ( error ) throw error;
  console.log('Server running on port ' + port + '...');
});

app.post('/payment', (req, res) => {
  //stuff we're going to send to stripe
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',          //we're only dealing with dollars for now  
  }

  //second arg is handler for stripe 
  stripe.charges.create( body, 
    (stripeErr, stripeRes) => {
      if ( stripeErr ) {
        res.status( 500 ).send({ error: stripeErr });
      }
      else {
        res.status( 200 ).send({ success: stripeRes });
      }
    }
  )
})
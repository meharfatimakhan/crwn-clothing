import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HAXkPJgfZHGku9WlLt08UBRDwmttXpkUyVvfLhqgZivgb452s8tOX1c8M7T4lkYf2fWlT2h4T3SmSIDv0GQm9Lu00sr2LPHme'
    const onToken = token => {
        console.log(token)
        alert('Payment Successful!')
    }
    return (
        <StripeCheckout 
        label = 'Pay Now'
        name = 'CRWN Clothing Ltd'
        billingAddress
        shippingAddress
        image = 'https://sendeyo.com/up/d/f3eb2117da'
        description = {`Your total is ${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;
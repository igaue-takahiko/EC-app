import React from 'react'
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentEdit } from '../components/Payment';

const STRIPE_PUBLIC_KEY = "pk_test_51HZKaFJlUmKDQlOiPmUZEmZz4UgaN49AmeYB7eHPf34Oek5kVeD2WUUhr9ySAMjgYXAo3GNt21EI7B5uHF3Krgp600OAnLAxmp";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    )
}

export default CheckoutWrapper

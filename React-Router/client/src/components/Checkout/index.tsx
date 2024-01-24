import { StripeError, loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useCart } from "../../lib/cart-state";
import { CURRENT_USER_QUERY } from "../UserInfo";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "@tanstack/react-router";

import "./checkout-styles.css";
import "./sick-button-styles.css";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutForm() {
  const [error, setError] = useState<StripeError>();
  const [_, setLoading] = useState(false);
  const stripe = useStripe() as Stripe;
  const elements = useElements();
  const navigate = useNavigate();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e: any) {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);
    console.log("We gotta do some work..");
    // 2. Start the page transition - Find another way to have page transitions without using nProgress

    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement) as any,
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      //   find a replacement to stop page load without using nProgress
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished with the order!!`);
    console.log(order);
    // 6. Change the page to view the order

    // react-router-implementation
    // navigate(`/orders/${order.data.checkout.id}`);

    // tanstack/react-router implementation
    navigate({
      to: "/orders/$orderId",
      params: { orderId: order.data.checkout.id },
    });
    // 7. Close the cart
    closeCart();

    // 8. turn the loader off
    setLoading(false);
    // replace nProgress.done() with something else
  }

  return (
    <form className="checkout__form" onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <button>Check Out Now</button>
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };

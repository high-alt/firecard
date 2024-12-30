"use client"
import React from "react"
import { PaymentElement, Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKTEST ?? "")
export default function CheckoutElem() {
  const [clientSecret, setClientSecret] = React.useState("")

  const options: StripeElementsOptions = {
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_TESTSECRET,
    appearance: { theme: "stripe" },
  }

  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <form>
          <PaymentElement />
        </form>
      </Elements>
    </div>
  )
}

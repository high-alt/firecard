import { LineItem, PaymentIntent } from '@stripe/stripe-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_TESTSECRET ?? '')

interface TaxCalculation {
  id: string;
  // Include other relevant properties of taxCalculation
}

interface PaymentIntentType extends PaymentIntent {
  metadata: {
    tax_calculation: string; // or TaxCalculation if you have a specific type for this
    // You can add more metadata fields here if needed
  };
  // Add any other custom fields you might have extended the PaymentIntent with
}

const calculateTax = async (items: LineItem[], currency: string) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "920 5th Ave",
        city: "Seattle",
        state: "WA",
        postal_code: "98104",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: items.map((item) => buildLineItem(item)),
  })

  return taxCalculation
}

const buildLineItem = (item: LineItem) => {
  return {
    amount: item.amount, // Amount in cents
    reference: item.name, // Unique reference for the item in the scope of the calculation
  }
}

// Securely calculate the order amount, including tax
const calculateOrderAmount = (items: LineItem[], taxCalculation: Stripe.Tax.Calculation) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total with any exclusive taxes on the server to prevent
  // people from directly manipulating the amount on the client
  let orderAmount = 1400;
  orderAmount += taxCalculation.tax_amount_exclusive;
  return orderAmount;
};

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { items } = req.body;
  const taxCalculation = await calculateTax(items, "eur");
  const amount = await calculateOrderAmount(items, taxCalculation);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      tax_calculation: taxCalculation.id
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })

  // Invoke this method in your webhook handler when `payment_intent.succeeded` webhook is received
  const handlePaymentIntentSucceeded = async (paymentIntent: PaymentIntentType) => {
    // Create a Tax Transaction for the successful payment
    stripe.tax.transactions.createFromCalculation({
      calculation: paymentIntent.metadata['tax_calculation'],
      reference: 'myOrder_123', // Replace with a unique reference from your checkout/order system
    })
  }
}
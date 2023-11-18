const { Router } = require("express");
const getPriceNumber = require("../utils/getPriceNumber");
const priceFormat = require("../utils/priceFormat");
const stripe = require("stripe")(
  "sk_test_51NMpM9SHofiqml0oLlwVOd76idnccvQhVb6bO2YBAed3zhICYBtkex9RHpwrEiendpGV9pWXzcEjw5HMBa2cUws900jRCz7BIg"
);

const calculateOrderAmount = (checkoutState = []) => {
  const itemsPriceArray = [];
  const totalItemsArray = [];
  let TotalItems = null;
  let Subtotal = null;
  let finalAmount = null;
  checkoutState?.map((items) => totalItemsArray.push(items.quantity));
  TotalItems = totalItemsArray.reduce((total, num) => total + num);
  checkoutState?.map((items) =>
    itemsPriceArray.push(items.quantity * getPriceNumber(items.price))
  );
  Subtotal = itemsPriceArray.reduce((total, num) => total + num);
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  finalAmount = Subtotal + 100;
  return finalAmount * 100;
};

const router = Router();

router.post("/intent", async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(req.body),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;

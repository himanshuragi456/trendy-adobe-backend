const { Router } = require("express");
const getPriceNumber = require("../utils/getPriceNumber");
const Transaction = require("../models/Transaction");
const Razorpay = require("razorpay");
const crypto = require('crypto');

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
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  finalAmount = Subtotal + 100;
  return finalAmount * 100;
};

const router = Router();

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
      key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
    });

    const options = {
      amount: calculateOrderAmount(req.body),
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/success/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

    await Transaction.findByIdAndUpdate(id, req.body);

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

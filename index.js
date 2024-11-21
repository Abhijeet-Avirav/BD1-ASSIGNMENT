const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

app.use(cors());

app.get('/cart-total', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const newItemPrice = parseFloat(req.query.newItemPrice);
  let toatlCartValue = cartTotal + newItemPrice;
  return res.send(toatlCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  // let { parseFLoat(cartTotal), parseBoolean(isMember) } = req.query;
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember === 'true') {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  return res.status(200).send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  return res.send((cartTotal * (5 / 100)).toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let daysToDeliver = null;
  if (shippingMethod.toLowerCase() === 'express')
    daysToDeliver = distance / 100;
  else daysToDeliver = distance / 50;
  return res.send(daysToDeliver.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  const result = weight * distance * 0.1;

  return res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  const result = purchaseAmount * loyaltyRate;

  return res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

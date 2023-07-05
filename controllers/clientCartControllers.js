const Cart = require('../models/Cart');

const priceFormat = require('../utils/priceFormat');
const getPriceNumber = require('../utils/getPriceNumber');

const post_cart = async (req, res) => {
  try {
    const { name, quantity, total, userId } = req.body;

    // Finding if cart already exist
    const cartExist = await Cart.findOne({ name, userId });

    // If not exist create new cart
    if (cartExist === null) {
      await Cart.create(
        req.body,
      ).then((response) => {
        res.status(200).send(response);
      }).catch((err) => res.send({ err }));
    } else {
      // If exist update the cart
      const updatedQuantity = cartExist.quantity + quantity;
      const oldTotal = getPriceNumber(cartExist.total);
      const newTotal = getPriceNumber(total);
      const updatedTotal = +oldTotal + +newTotal;

      await Cart.findByIdAndUpdate(
        cartExist._id,
        {
          quantity: updatedQuantity,
          total: priceFormat(updatedTotal),
        },
        { new: true },
      ).then((response) => {
        res.status(200).send(response);
      }).catch((err) => res.send({ err }));
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const delete_cart = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.findByIdAndDelete(id)
      .then((response) => {
        res.status(200).send(response);
      });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const get_cart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartData = await Cart.find({ userId: id });

    res.status(200).send(cartData);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

module.exports = {
  post_cart,
  delete_cart,
  get_cart,
};

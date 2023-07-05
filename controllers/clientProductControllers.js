const Product = require('../models/Product');

const get_all_product = async (req, res) => {
  try {
    const AllProduct = await Product.find()
      .sort({ dateAdded: -1 });

    res.status(200).send(AllProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

const get_detail_product = async (req, res) => {
  try {
    const { id } = req.params;

    const DetailProduct = await Product.findById({ _id: id });

    res.status(200).send(DetailProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  get_all_product,
  get_detail_product,
};

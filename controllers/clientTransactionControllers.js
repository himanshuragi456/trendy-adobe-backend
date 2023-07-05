const Transaction = require('../models/Transaction');

const post_transaction = async (req, res) => {
  try {
    await Transaction.create(
      req.body,
    ).then((response) => {
      res.status(200).send(response);
    }).catch((err) => res.send(err));
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const update_transaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndUpdate(id,
      req.body,
    ).then((response) => {
      res.status(200).send(response);
    }).catch((err) => res.send(err));
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const delete_transaction = async (req, res) => {
  try {
    const { id } = req.params;

    await Transaction.findByIdAndDelete(id)
      .then((response) => {
        res.status(200).send(response);
      }).catch((err) => res.send(err));
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const get_transaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transactionData = await Transaction.find({ userId: id });

    res.status(200).send(transactionData);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

const get_detail_transaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transactionData = await Transaction.findById(id);

    if (!transactionData) {
      res.status(200).send({ msg: 'No data' });
    } else {
      res.status(200).send(transactionData);
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};

module.exports = {
  post_transaction,
  update_transaction,
  delete_transaction,
  get_transaction,
  get_detail_transaction,
};

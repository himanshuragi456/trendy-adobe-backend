const priceFormat = (number) => {
  const result = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `₹${result}`;
};

module.exports = priceFormat;

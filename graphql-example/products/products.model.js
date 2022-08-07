const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 42.12,
  },
  {
    id: "bluejean",
    description: "Blue Jean",
    price: 55.55,
  },
];

function getAllProducts() {
  return products;
}

module.exports = {
  getAllProducts,
};

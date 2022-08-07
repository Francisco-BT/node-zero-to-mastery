const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 42.12,
    reviews: [],
  },
  {
    id: "bluejean",
    description: "Blue Jean",
    price: 55.55,
    reviews: [],
  },
];

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(id, description, price) {
  const product = { id, description, price, reviews: [] };
  products.push(product);

  return product;
}

function addNewProductReview(id, rating, comment) {
  const product = getProductById(id);

  if (!product) {
    throw new Error("Product not found!");
  }

  const newReview = {
    id: Date.now(),
    rating,
    comment,
  };
  product.reviews.push(newReview);

  return product;
}

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  getProductsByPrice,
  addNewProductReview,
};

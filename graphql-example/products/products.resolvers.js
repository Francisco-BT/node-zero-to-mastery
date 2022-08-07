const productsModel = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      const { minPrice, maxPrice } = args;
      return productsModel.getProductsByPrice(minPrice, maxPrice);
    },
    product: (_, args) => {
      const { id } = args;
      return productsModel.getProductById(id);
    },
  },
};

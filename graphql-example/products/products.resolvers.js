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
  Mutation: {
    addNewProduct: (_, args) => {
      const { id, description, price } = args;
      return productsModel.addNewProduct(id, description, price);
    },
    addNewProductReview: (_, args) => {
      const { id, rating, comment } = args;
      return productsModel.addNewProductReview(id, rating, comment);
    },
  },
};

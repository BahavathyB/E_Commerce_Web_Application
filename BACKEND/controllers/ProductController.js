const Product = require("../database/Product");

// get all product
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    if (!allProducts) {
      return res.status(400).json({
        success: false,
        message: "Product can't be fetched",
      });
    }

  
    return res.status(200).json({
        success: true,
        message: "All products fetched successfully",
        allProducts: allProducts
    })
    

  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({
      success: false,
      message: "Product can't be fetched",
    });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const product = await Product.find({id});

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Single Product fetched:", product);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(400).json({
      success: false,
      message: "Error fetching product",
    });
  }
};


// add product
const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description: req.body.description,
      rating: req.body.rating,
      tags: req.body.tags,
    });
    console.log(product);
    await product.save();

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not created",
      });
    }

    console.log("Product added successfully");
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      productAdded: product,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({
      success: false,
      message: "Product can't be uploaded",
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id; // custom ID from route param
    const updatedData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },            // filter by custom `id` field
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product updated:", updatedProduct);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const productID = parseInt(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({ id: productID });

    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product deleted successfully");
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      detetedProduct: deletedProduct,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({
      success: false,
      message: "Product can't be deleted",
    });
  }
};

module.exports = {getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct };

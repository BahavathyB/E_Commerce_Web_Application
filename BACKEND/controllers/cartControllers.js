// controllers/cartController.js
const Product = require("../database/Product");
const User = require("../database/User");

const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findOne({_id: req.userInfo.id})
    const cart = user.cartData || [];
    console.log(user);

    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log("new quantity: ", existingItem.quantity);
      
    } else {
      cart.push({ ...product.toObject(), quantity: 1 });
    }

    console.log(existingItem);
    
    user.cartData = cart;
    user.markModified('cartData');
    await user.save();
     console.log("Product added to cart successfully");
     

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo.id);
    console.log("get cart user: ", user);
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cartData || [];
    console.log("get cart: ", cart);
    res.status(200).json({
        cart: cart
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const deleteFromCart = async (req, res) => {
  const { productId } = req.params; // Getting from URL param

  try {
    // Fetch the user from the database using token info
    const user = await User.findOne({ _id: req.userInfo.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedCart = (user.cartData || []).filter((item) => item.id !== Number(productId));

    user.cartData = updatedCart;

    // Mark cartData as modified since it's an array of objects
    user.markModified("cartData");

    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const reduceCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.userInfo.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cartData || [];

    const item = cart.find((item) => item.id === productId);

    if (item && item.quantity > 1) {
      item.quantity -= 1;

      user.cartData = cart;
      user.markModified("cartData"); // Ensure Mongoose tracks array changes
      await user.save();

      return res.status(200).json({ message: "Item quantity reduced", cart });
    } else if (item && item.quantity === 1) {
      return res.status(200).json({ message: "Minimum quantity reached" });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const resetCart = async (req, res) => {
  try {
    // Get full user document using ID from token
    const user = await User.findById(req.userInfo.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset cart data
    user.cartData = [];

    user.markModified("cartData"); // Ensure Mongoose tracks the change
    await user.save();

    res.status(200).json({ message: "Cart reset", cart: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  reduceCartItem,
  resetCart,
};

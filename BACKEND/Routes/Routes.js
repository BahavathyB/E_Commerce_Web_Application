

const express = require("express")
const {addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} = require("../controllers/ProductController")
const imageMulterMiddleware = require("../imageUploadHelper/imageMulterMiddleware")
const {uploadImageController} = require("../controllers/imageUpload_controller")
const { userRegistration, userLogin } = require("../controllers/User_controllers")
const {
  addToCart,
  getCart,
  deleteFromCart,
  reduceCartItem,
  resetCart,
} = require("../controllers/cartControllers");
const verifyToken = require("../middleware/verifyTokenMiddleware")

const router = express.Router()

// Product Routes
router.get("/allproducts", getAllProducts) //get all products
router.get("/product/:id", getSingleProduct) //get single products
router.post("/addproduct", addProduct) // add product
router.put("/updateproduct/:id", updateProduct)
router.delete("/deleteproduct/:id", deleteProduct) // delete product

// image routes
router.post("/upload-image", imageMulterMiddleware.single("image"), uploadImageController)

// cart routes
router.post("/cart/add", verifyToken, addToCart);
router.get("/cart/get", verifyToken, getCart);
router.delete("/cart/delete/:productId", verifyToken, deleteFromCart);
router.post("/cart/reduce", verifyToken, reduceCartItem);
router.post("/cart/reset", verifyToken, resetCart);

// User registration 
router.post("/signup", userRegistration)
router.post("/login", userLogin)

module.exports = router
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWTUser from "../middleware/authUser.middleware.js";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    updateName, 
    updatePhone,
    updatePassword,
    addToCart,
    removeFromCart,
    findCart, 
    increaseQuantity,
    decreaseQuantity,
    addToWishlist, 
    removeFromWishlist, 
    findWishlist,
    changeAddress,
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(loginUser);

//Secured routes
router.route("/logout").post(verifyJWTUser, logoutUser);
router.route("/update-name").post(upload.none(), verifyJWTUser, updateName);
router.route("/update-phone").post(upload.none(), verifyJWTUser, updatePhone);
router.route("/update-password").post(upload.none(), verifyJWTUser, updatePassword);
router.route("/wishlist").post( verifyJWTUser, findWishlist);
router.route("/add-to-cart").post( verifyJWTUser, addToCart);
router.route("/remove-from-cart").post( verifyJWTUser, removeFromCart);
router.route("/find-cart").post( verifyJWTUser, findCart);
router.route("/increase-quantity").post( verifyJWTUser, increaseQuantity);
router.route("/decrease-quantity").post( verifyJWTUser, decreaseQuantity);
router.route("/change-address").post( verifyJWTUser, changeAddress);
router.route("/add-to-wishlist").post( verifyJWTUser, addToWishlist);
router.route("/remove-from-wishlist").post( verifyJWTUser, removeFromWishlist);

export default router;
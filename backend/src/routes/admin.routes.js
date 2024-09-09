import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWTAdmin from "../middleware/authAdmin.middleware.js";
import { 
    registerAdmin, 
    loginAdmin, 
    logoutAdmin, 
    updateName, 
    updatePhone,
    updatePassword, 
    addProduct
} from "../controller/admin.controller.js";

const router = Router();

router.route("/register").post(upload.none(), registerAdmin);
router.route("/login").post(loginAdmin);

//Secured routes
router.route("/logout").post(verifyJWTAdmin, logoutAdmin);
router.route("/update-name").post(upload.none(), verifyJWTAdmin, updateName);
router.route("/update-phone").post(upload.none(), verifyJWTAdmin, updatePhone);
router.route("/update-password").post(upload.none(), verifyJWTAdmin, updatePassword);
router.route("/add-product").post(upload.single("coverImage"), verifyJWTAdmin, addProduct);

export default router;
import { Router } from "express"
import {
    findProducts,
    fetchProduct,
} from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route('/:search').post(upload.none(), findProducts);
router.route('/fetch-product/:productid').get(upload.none(), fetchProduct);


export default router;
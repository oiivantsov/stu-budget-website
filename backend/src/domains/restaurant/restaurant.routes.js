import { Router } from "express";
import { upload, check } from "../../middlewares/multer.js";
import auth from "../../middlewares/auth.js";
const router = Router();
import { getAll, getById, getByCity, getNearby, addReview, deleteReview, updateReview, uploadImage, deleteImage } from "./restaurant.controller.js"
import { checkParameters } from "../../utils/checkParameters.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";

router.get("/all", getAll);
router.get("/city", checkParameters([], [], ["city"]), getByCity);
router.get("/id", checkParameters([], [], ["id"]), getById);
router.get("/nearby", checkParameters([], ["city", "street", "limit"], []), getNearby);

// Reviews
router.post("/review/add", [checkParameters([], ["restaurant", "rating", "comment"], []), auth], addReview);
router.put("/review/update", [checkParameters([], ["id", "rating", "comment"], []), auth], updateReview);
router.delete("/review/delete", [checkParameters([], [], ["id"]), auth], deleteReview);

// Images
router.post("/image/upload", [checkParameters([], [], ["user", "restaurant"]), auth, check, upload.single("image")], uploadImage);
router.delete("/image/delete", [checkParameters([], ["id"], []), auth], deleteImage);

export default router;

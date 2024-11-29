import { Router } from "express";
import { upload, check } from "../../middlewares/multer.js";
const router = Router();
import { getAll, getById, getByCity, getNearby, addReview, deleteReview, updateReview, uploadImage, deleteImage } from "./restaurant.controller.js"
import { checkParameters } from "../../utils/checkParameters.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";

// GET all
router.get("/all", getAll);
router.get("/city", checkParameters([], [], ["city"]), getByCity);
router.get("/id", checkParameters([], [], ["id"]), getById);
router.get("/nearby", checkParameters([], ["city", "street", "limit"], []), getNearby);

// POST Add review
router.post("/review/add", checkParameters([], ["user", "restaurant", "rating", "comment"], []), addReview);
router.put("/review/update", checkParameters([], ["id", "rating", "comment"], []), updateReview);
router.delete("/review/delete", checkParameters([], [], ["id"]), deleteReview);

// Images
router.post("/image/upload", [checkParameters([], [], ["user", "restaurant"]), check, upload.single("image")], uploadImage);
router.delete("/image/delete", checkParameters([], ["id"], []), deleteImage);

export default router;

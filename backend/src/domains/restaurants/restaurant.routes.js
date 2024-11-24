import { Router } from "express";
import { upload } from "../../middlewares/multer.js";
const router = Router();
import { getAll, getById, getByCity, getNearby, addReview, deleteReview, updateReview, uploadImage, deleteImage } from "./restaurant.controller.js"

// GET all
router.get("/all", getAll);
router.get("/city", getByCity);
router.get("/id", getById);

// GET nearby restaurants
/*
* Example request GET nearby/Mannerheimintie 1/Helsinki/10000
*
* Limit defines the distance from which restaurants are shown.
* In the above example restaurants further than 10,000 metres / 10km
* will not be provided in the response.
*
* Only restaurants in the given city are provided in the response.
*
* Limit and provided distances are in metres.
*/
router.get("/nearby", getNearby);

// POST Add review
router.post("/review/add", addReview);
router.put("/review/update", updateReview);
router.delete("/review/delete", deleteReview);

// Images
router.post("/image/upload", upload.single("image"), uploadImage);
router.delete("/image/delete", deleteImage);

export default router;

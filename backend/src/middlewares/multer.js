import multer from "multer";
import { verifyRestaurantId, verifyUserId } from "../utils/verifiers.js";

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/");
    },
    filename:(req, file, cb) => {
        // For whatever reason multer doesn't automatically grant req.file so we'll have to assign it manually
        req.file = file;
        req.file.filename = Date.now() + "-" + file.originalname;
        cb(null, req.file.filename);
    }
});

export const upload = multer({
    storage:storage,
    limits:{
        fileSize:10000000, // 10mb
    },
    fileFilter:(req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }
});

export const check = async (req, res, next) => {
    switch (await verifyRestaurantId(restaurant)) {
        case "not found":
            return res.status(404).json({ message: `No restaurant found with id ${restaurant}` });
        case "invalid":
            return res.status(400).json({ message: "Invalid restaurant id" });
        case "found":
            next();
    }

    switch (await verifyUserId(id)) {
        case "not found":
            return res.status(404).json({ message: `No user found with id ${id}` });
        case "invalid":
            return res.status(400).json({ message: "Invalid user id" });
        case "found":
            next();
    }
}
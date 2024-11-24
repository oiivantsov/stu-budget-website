import multer from "multer";

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/");
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
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
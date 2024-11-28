
import mongoose from "mongoose";
import imageSchema from "../schemas/image.schema.js";


export default mongoose.model("Image", imageSchema);

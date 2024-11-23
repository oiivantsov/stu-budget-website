import mongoose from "mongoose";
import reviewSchema from "../schemas/review.schema.js";


export default mongoose.model("Review", reviewSchema);

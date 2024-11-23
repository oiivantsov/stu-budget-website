import mongoose from "mongoose";
import userSchema from "../schemas/user.schema.js";


export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
import restaurantSchema from "../schemas/restaurant.schema.js";


export default mongoose.model("Restaurant", restaurantSchema);

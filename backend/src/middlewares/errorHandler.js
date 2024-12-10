import Tracer from "../utils/tracer.js";

const ERROR = "MIDDLEWARE_ERROR";

Tracer.register(ERROR);

export const errorHandler = (err, req, res, next) => {
    Tracer.error(ERROR, err);
    return res.status(500).json({msg:"Server error"});
}
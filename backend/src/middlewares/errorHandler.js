import Tracer from "../utils/tracer.js";

const ERROR = "MIDDLEWARE_ERROR";

Tracer.register(ERROR);

export const errorHandler = (err, req, res, next) => {
    Tracer.error(ERROR, err);
    res.json({msg:"Something bad happened"});
}
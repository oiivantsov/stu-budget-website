import Tracer from "./tracer.js";

const ERROR = "PARAMETER_ERROR";

Tracer.register(ERROR);

// params = req.params
// body = req.body

export const checkParameters = (params, body) => (req, res, next) => {
    const reqParamList = Object.keys(req.params);
    const reqBodyList = Object.keys(req.body);
    const hasAllParams = params.every(entry =>reqParamList.includes(entry));
    const hasAllBody = body.every(entry => reqBodyList.includes(entry));

    console.log("In parmeter checker");

    if (!hasAllParams || !hasAllBody) {
        Tracer.error(ERROR, {name:"ParameterError", message:"Some of the parameters for this endpoint are missing"});
        return res.status(400).json({msg:"Parameters for this route are missing"});
    }

    next();
};
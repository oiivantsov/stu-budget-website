import { PRODUCTION } from "../../configs/dao.config.js"

import dummy from "./dummydb/index.js";
import mongo from "./mongodb/index.js";

// Note: vanilla js is hot garbage that doesn't allow interfaces/abstract classes so better pray God all methods have been correctly implemented for no runtime crashes

export default PRODUCTION ? mongo : dummy;
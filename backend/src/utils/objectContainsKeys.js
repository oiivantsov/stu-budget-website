"use strict";


const objectContainsKeys = (obj, keys) => {
    const hasTheseKeys = [];
    keys.some(key => {
        if (obj[key] !== undefined) {
            hasTheseKeys.push(key);
        }
    });

    return hasTheseKeys;
};


export default objectContainsKeys;

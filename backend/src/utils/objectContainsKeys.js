"use strict";


const objectContainsKeys = (object, keys) => {
    const hasTheseKeys = [];
    keys.some(key => {
        if (object.hasOwnProperty(key)) {
            hasTheseKeys.push(key);
        }
    });

    return hasTheseKeys;
};


export default objectContainsKeys;

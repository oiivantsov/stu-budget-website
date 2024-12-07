export default function objectOnlyHasFields(obj, fields) {
    const extraFields = [];

    Object.keys(obj).forEach(key => {
        if (!fields.includes(key)) {
            extraFields.push(key);
        }
    });

    if (extraFields.length > 0) {
        return extraFields;
    } else {
        return null;
    }
}

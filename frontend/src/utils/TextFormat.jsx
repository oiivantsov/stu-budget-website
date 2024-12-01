// capitalize the first letter of a string
// capitalizeFirstLetter function
function capitalizeFirstLetter(string) {
    if (!string || typeof string !== "string") return "";
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalizeFirstLetter };
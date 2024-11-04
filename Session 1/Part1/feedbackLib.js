let feedbacks = [];
let nextId = 1;

function getAll() {
    return feedbacks;
}

function addOne(name, message, rating) {
    const feedback = {
        id: feedbacks.length + 1,
        name: name,
        message: message,
        rating: rating
    };
    feedbacks.push(feedback);
    return feedback;
}

function findById(id) {
    var id = parseInt(id);
    result = feedbacks.find(f => f.id === id);
    return result;
}

function updateById(id, name, message, rating) {
    const feedback = findById(id);
    if (feedback) {
        feedback.name = name;
        feedback.message = message;
        feedback.rating = rating;
        return feedback;
    }
    return null;
}

function deleteById(id) {
    var id = parseInt(id);
    const index = feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
        feedbacks.splice(index, 1);
        return true;
    }
    return false;
}



if (require.main === module) {
    let result = addOne( "John Smith", "Great session on React components! I found the examples very helpful.", 4);
    console.log(result);
    console.log("getAll called:", getAll());
    console.log("findById called:", findById(1));
    // rest of the tests here
   }

module.exports = {
    getAll,
    addOne,
    findById,
    updateById,
    deleteById
};
let toursArray = [];
let nextId = 1;

function addOne(name, info, image, price) {
  if (name === undefined || info === undefined || image === undefined || price === undefined) {
    return false;
  }

  const tour = {
    id: nextId++,
    name,
    info,
    image,
    price,
  };
  toursArray.push(tour);
  return tour;
}

function getAll() {
  return toursArray;
}

function findById(id) {
  const numericId = parseInt(id);
  const tour = toursArray.find(item => item.id === numericId);
  return tour || false;
}

function updateOneById(id, updatedData) {
  const tour = findById(id);
  if (tour) {
    if (updatedData.name !== undefined) tour.name = updatedData.name;
    if (updatedData.info !== undefined) tour.info = updatedData.info;
    if (updatedData.image !== undefined) tour.image = updatedData.image;
    if (updatedData.price !== undefined) tour.price = updatedData.price;
    return tour;
  }
  return false;
}

function deleteOneById(id) {
  const tour = findById(id);
  if (tour) {
    const initialLength = toursArray.length;
    toursArray = toursArray.filter(tour => tour.id !== Number(id));
    return toursArray.length < initialLength;
  }
  return false;
}

if (require.main === module) {
  let result = addOne(
    "7 Days Tour",
    "Join us for the Best of Helsinki!",
    "https://www.course-api.com/images/tours/tour-x.jpeg",
    "1,495"
  );
  console.log(result);
  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));
  console.log(
    "updateOneById called:",
    updateOneById(1, {
      name: "7 Days Tour",
      info: "Join us for the Best of Helsinki!",
      image: "https://www.course-api.com/images/tours/tour-x.jpeg",
      price: "1,495",
    })
  );
  console.log("findById called after update:", findById(1));
  console.log("deleteOneById called:", deleteOneById(1));
  console.log("getAll called after delete:", getAll());
}

const Tours = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Tours;
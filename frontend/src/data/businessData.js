import food1 from '../assets/images/food1.jpg';
import food2 from '../assets/images/food2.jpg';
import food3 from '../assets/images/food3.jpg';

const businessData = {
    name: "Hoku Helsinki",
    rating: "4.5 ★",
    totalReviews: 230, // Renamed to totalReviews
    category: "$$ • Hawaiian, Asian Fusion",
    address: {
      street: "Annankatu 28",
      city: "00100 Helsinki",
      country: "Finland",
      phone: "+358 12 345 6789",
      website: "http://www.hoku.fi"
    },
    images: [food1, food2, food3],
    reviews: [
      { id: 1, name: "John D.", rating: "5 ★", comment: "Amazing food and great atmosphere. Highly recommend the poke bowl!" },
      { id: 2, name: "Jane S.", rating: "4 ★", comment: "Delicious dishes but a bit crowded during peak hours. Worth the wait!" },
      { id: 3, name: "Alex R.", rating: "5 ★", comment: "Fantastic flavors and friendly staff. Will definitely come back!" }
    ]
  };

  export default businessData;
  
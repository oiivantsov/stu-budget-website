import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Recommended from '../components/home/Recommended';
import { businesses } from '../data/businesses'; // Import businesses data

function Home() {
  // Filter or select recommended restaurants (example: top 3 based on average rating)
  const recommendedRestaurants = businesses
    .sort((a, b) => b.reviews.average - a.reviews.average) // Sort by highest rating
    .slice(0, 3); // Select the top 3

  return (
    <main className="main-content">
      <Hero />
      <Categories/>
      <Recommended recommendedRestaurants={recommendedRestaurants} />
    </main>
  );
}

export default Home;

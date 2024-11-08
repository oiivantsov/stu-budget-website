import Hero from '../components//home/Hero';
import Categories from '../components//home/Categories';
import Recommended from '../components//home/Recommended';
import categoriesData from '../data/categoriesData';
import recommendedData from '../data/recommendedData';

function Home() {
  return (
    <main className="main-content">
      <Hero />
      <Categories categories={categoriesData} />
      <Recommended recommendedRestaurants={recommendedData} />
    </main>
  );
}

export default Home;

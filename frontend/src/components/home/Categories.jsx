function Categories({ categories }) {
    return (
      <section className="categories">
        <h2>Сategories</h2>
        <div className="category-cards">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.label} />
              <span>{category.label}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Categories;
  
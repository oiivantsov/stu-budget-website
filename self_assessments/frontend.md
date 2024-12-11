# Frontend Self-Assessment

---

## Example 1: Enhancing the SearchResults Component

**How It Was:**
- The initial implementation of the `SearchResults` component directly integrated state management, filtering logic, and API calls in a single file.
- **Limitations:**
  - Hardcoded business data without fetching from an API.
  - Limited language support with no dynamic text translations.
  - No loading or error states for the component.
  - No separation of concerns for filter logic and data fetching.

```javascript
// Initial Implementation
const [filteredResults, setFilteredResults] = useState(businesses);
useEffect(() => {
  let results = businesses;
  if (find) results = results.filter(...);
  if (near) results = results.filter(...);
  setFilteredResults(results);
}, [find, near]);
```

**How It Is Now:**
- Improved modularity by introducing hooks like `useFilters` and `useFetchData`.
- Added multi-language support via `LanguageContext`.
- Introduced loading and error states using the `react-loader-spinner`.
- Utilized environment variables for API base URLs to improve maintainability.
- **Achievements:**
  - Enhanced user experience with dynamic translations and smoother data handling.
  - Reduced complexity by delegating filter logic to a custom hook.
  - Improved scalability by fetching live data from APIs.

```javascript
// Refactored Implementation
const { data: allResults, loading, error } = useFetchData(fetchAllCafes);
const filteredResults = useFilters(allResults, findText, nearText, selectedFilters, filterType);
```

---

## Example 2: Improving the Business Details Page

**How It Was:**
- The `Business` component was functional but lacked scalability and dynamic text support.
- **Limitations:**
  - Static error/loading messages.
  - Hardcoded text without translations.
  - Repetitive code for handling user actions like reviews and image uploads.

```javascript
// Initial Image Upload Handler
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await uploadImage(formData, userId, id);
    setBusinessData((prev) => ({ ...prev, images: [...prev.images, response.img] }));
  } catch (err) {
    console.error("Error uploading image:", err.message);
  }
};
```

**How It Is Now:**
- Refactored to include `LanguageContext` for multi-language support.
- Improved user feedback with dynamic text and a loading spinner from `react-loader-spinner`.
- Added reusable `getText` function for retrieving translated strings.
- **Achievements:**
  - Simplified and centralized text handling.
  - Enhanced accessibility by providing localized text in multiple languages.
  - Improved maintainability with cleaner code structure.

```javascript
// Enhanced Image Upload Handler with Translations
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  try {
    setUploading(true);
    const response = await uploadImage(formData, userId, id);
    setBusinessData((prev) => ({ ...prev, images: [...prev.images, response.img] }));
  } catch (err) {
    console.error("Error uploading image:", err.message);
  } finally {
    setUploading(false);
  }
};
```

---

## Example 3: Enhancing the Favorites Component

**How It Was:**
- The initial `FavoritesComponent` displayed a list of user favorites but lacked user experience features.
- **Limitations:**
  - No carousel for displaying favorites.
  - Hardcoded static text with no translations.
  - Missing visual feedback during loading or deletion.

```javascript
// Initial Favorites Display
favorites.map((restaurant) => (
  <div key={restaurant._id}>
    <Link to={`/business/${restaurant._id}`}>
      <h3>{restaurant.name}</h3>
    </Link>
    <button onClick={() => deleteFavorite(restaurant._id)}>Delete</button>
  </div>
));
```

**How It Is Now:**
- Added a carousel using the `react-slick` library for better UI.
- Integrated `LanguageContext` for multi-language support.
- Improved user feedback with loading states and dynamic translations.
- **Achievements:**
  - Enhanced visual appeal with a responsive carousel for favorites.
  - Increased usability by supporting multiple languages.
  - Improved user interaction with clear loading and error indicators.

```javascript
// Enhanced Favorites Display with Carousel
<Slider {...settings}>
  {favorites.map((restaurant) => (
    <div key={restaurant._id}>
      <Link to={`/business/${restaurant._id}`}>
        <img src={restaurant.images?.[0] || placeholderImage} alt={restaurant.name} />
        <h3>{restaurant.name}</h3>
      </Link>
      <button onClick={() => deleteFavorite(restaurant._id)}>{getText('delete')}</button>
    </div>
  ))}
</Slider>
```

---

## Key Lessons Learned
1. **Separation of Concerns:** Modularizing code with hooks like `useFetchData` and `useFilters` simplifies maintenance and testing.
2. **Localization:** Incorporating multi-language support with `LanguageContext` enhances accessibility and user experience.
3. **Improved UX/UI:** Leveraging libraries like `react-slick` and `react-loader-spinner` enriches the interface and provides smoother interactions.
4. **Scalability:** Refactoring to support dynamic data sources and reusable logic prepares the application for future growth.
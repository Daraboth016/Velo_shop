import { useMemo, useState } from "react";
import { FiFilter, FiSearch, FiSliders, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ProductComparison from "../components/ProductComparison";
import allProducts from "../data/allProducts";
import { useCart } from "../context/CartContext";
import {
  DEFAULT_DISCOVERY_FILTERS,
  filterAndSortProducts,
  getDiscoveryOptions,
  toggleComparisonProduct,
} from "../utils/productDiscovery";

const ShopPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filters, setFilters] = useState(DEFAULT_DISCOVERY_FILTERS);
  const [addedId, setAddedId] = useState(null);
  const [comparison, setComparison] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading] = useState(false);
  const options = useMemo(() => getDiscoveryOptions(allProducts), []);
  const results = useMemo(() => filterAndSortProducts(allProducts, filters), [filters]);

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const clearFilters = () => setFilters(DEFAULT_DISCOVERY_FILTERS);
  const hasFilters = Object.entries(filters).some(([key, value]) => value !== DEFAULT_DISCOVERY_FILTERS[key]);

  const handleAdd = (product) => {
    if (!addToCart(product)) {
      navigate("/account");
      return;
    }
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1200);
  };

  const handleCompare = (product) => {
    setComparison((current) => toggleComparisonProduct(current, product));
  };

  return (
    <div className="discovery-page">
      <PageHeader
        eyebrow="Explore the collection"
        title="Find your"
        accent="perfect part."
        subtitle="Professional-grade components from the brands riders trust. Search, filter, and compare the details that matter."
      />
      <main className="discovery-shell page-shell">
        <section className="discovery-toolbar" aria-label="Product discovery controls">
          <div className="discovery-search">
            <FiSearch />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search products, brands, or categories..."
              aria-label="Search products"
            />
            {filters.query && <button type="button" aria-label="Clear search" onClick={() => updateFilter("query", "")}><FiX /></button>}
          </div>
          <button type="button" className="discovery-filter-toggle" onClick={() => setFiltersOpen((open) => !open)}><FiSliders /> Filters</button>
          <div className="discovery-sort">
            <label htmlFor="sort-products">Sort</label>
            <select id="sort-products" value={filters.sortBy} onChange={(event) => updateFilter("sortBy", event.target.value)}>
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </section>

        <div className={`discovery-layout${filtersOpen ? " filters-visible" : ""}`}>
          <aside className="filter-panel">
            <div className="filter-panel__heading">
              <span><FiFilter /> Refine results</span>
              {hasFilters && <button type="button" onClick={clearFilters}>Clear all</button>}
            </div>
            <fieldset>
              <legend>Category</legend>
              {options.categories.map((category) => (
                <label key={category} className="filter-option">
                  <input type="radio" name="category" checked={filters.category === category} onChange={() => updateFilter("category", category)} />
                  <span>{category}</span>
                  <small>{category === "All" ? allProducts.length : allProducts.filter((product) => product.category === category).length}</small>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Brand</legend>
              {options.brands.map((brand) => (
                <label key={brand} className="filter-option">
                  <input type="radio" name="brand" checked={filters.brand === brand} onChange={() => updateFilter("brand", brand)} />
                  <span>{brand}</span>
                  <small>{brand === "All" ? allProducts.length : allProducts.filter((product) => product.brand === brand).length}</small>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Price range</legend>
              <div className="price-inputs">
                <label><span>Min</span><input type="number" min={options.minPrice} max={options.maxPrice} value={filters.minPrice} placeholder={`$${options.minPrice}`} onChange={(event) => updateFilter("minPrice", event.target.value)} /></label>
                <label><span>Max</span><input type="number" min={options.minPrice} max={options.maxPrice} value={filters.maxPrice} placeholder={`$${options.maxPrice}`} onChange={(event) => updateFilter("maxPrice", event.target.value)} /></label>
              </div>
            </fieldset>
            <button type="button" className="filter-panel__apply" onClick={() => setFiltersOpen(false)}>Show results</button>
          </aside>

          <section className="results-panel" aria-live="polite">
            <div className="results-heading">
              <div><strong>{loading ? "Loading..." : results.length}</strong> components <span>{hasFilters ? "matching your filters" : "in the collection"}</span></div>
              {comparison.length > 0 && <span className="comparison-count">{comparison.length}/3 comparing</span>}
            </div>
            {loading ? (
              <div className="results-grid">{[1, 2, 3].map((item) => <div className="product-skeleton" key={item} />)}</div>
            ) : results.length ? (
              <div className="results-grid">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={() => handleAdd(product)}
                    addedId={addedId}
                    onCompare={handleCompare}
                    isCompared={comparison.some((item) => item.id === product.id)}
                    comparisonFull={comparison.length >= 3}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <div className="empty-results__icon"><FiSearch /></div>
                <h2>No components found.</h2>
                <p>Try a broader search or remove one of your filters to see more of the collection.</p>
                <button type="button" className="button button--primary" onClick={clearFilters}>Clear filters</button>
              </div>
            )}
          </section>
        </div>
      </main>
      <div className="page-shell">
        <ProductComparison
          products={comparison}
          onRemove={(id) => setComparison((current) => current.filter((product) => product.id !== id))}
          onClear={() => setComparison([])}
        />
      </div>
    </div>
  );
};

export default ShopPage;

export const DEFAULT_DISCOVERY_FILTERS = {
  query: "",
  category: "All",
  brand: "All",
  minPrice: "",
  maxPrice: "",
  sortBy: "featured",
};

export const getDiscoveryOptions = (products) => ({
  categories: ["All", ...new Set(products.map((product) => product.category))],
  brands: ["All", ...new Set(products.map((product) => product.brand))],
  minPrice: Math.min(...products.map((product) => product.price)),
  maxPrice: Math.max(...products.map((product) => product.price)),
});

export const filterAndSortProducts = (products, filters) => {
  const query = filters.query.trim().toLowerCase();
  const minPrice = filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
  const maxPrice = filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

  const results = products.filter((product) => {
    const searchable = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (filters.category === "All" || product.category === filters.category) &&
      (filters.brand === "All" || product.brand === filters.brand) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  return [...results].sort((a, b) => {
    if (filters.sortBy === "price-asc") return a.price - b.price;
    if (filters.sortBy === "price-desc") return b.price - a.price;
    if (filters.sortBy === "rating") return b.rating - a.rating;
    if (filters.sortBy === "name") return a.name.localeCompare(b.name);
    return products.indexOf(a) - products.indexOf(b);
  });
};

export const toggleComparisonProduct = (selectedProducts, product, limit = 3) => {
  const isSelected = selectedProducts.some((selected) => selected.id === product.id);
  if (isSelected) {
    return selectedProducts.filter((selected) => selected.id !== product.id);
  }
  if (selectedProducts.length >= limit) return selectedProducts;
  return [...selectedProducts, product];
};

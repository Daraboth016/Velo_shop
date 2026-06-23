import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import allProducts from "../data/allProducts";

const ShopPage = ({ cartCount, setCartCount }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [addedId, setAddedId] = useState(null);
 
  const categories = ["All", ...new Set(allProducts.map(p => p.category))];
  const brands = ["All", "Shimano", "SRAM", "Campagnolo", "FSA", "Maxxis", "RockShox"];
 
  const handleAdd = (id) => {
    setCartCount(c => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };
 
  let filtered = allProducts
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => activeBrand === "All" || p.brand === activeBrand);
 
  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
 
  return (
    <div>
      <PageHeader eyebrow="BROWSE ALL COMPONENTS" title="THE FULL" accent="SHOP" subtitle="Professional-grade parts from every major brand. Filter by category, brand, or price." />
 
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px" }}>
        {/* Filters bar */}
        <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 10 }}>CATEGORY</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  background: activeCategory === cat ? "#FF5500" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#555",
                  border: `1px solid ${activeCategory === cat ? "#FF5500" : "#222"}`,
                  padding: "6px 14px", fontSize: 10, fontWeight: 600, letterSpacing: 1, cursor: "pointer", transition: "all .15s"
                }}>{cat.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 10 }}>BRAND</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {brands.map(b => (
                <button key={b} onClick={() => setActiveBrand(b)} style={{
                  background: activeBrand === b ? "#1C1C1E" : "transparent",
                  color: activeBrand === b ? "#F0F0F0" : "#555",
                  border: `1px solid ${activeBrand === b ? "#444" : "#222"}`,
                  padding: "6px 14px", fontSize: 10, fontWeight: 600, letterSpacing: 1, cursor: "pointer", transition: "all .15s"
                }}>{b.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div style={{ minWidth: 160 }}>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 10 }}>SORT BY</div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              background: "#111", color: "#F0F0F0", border: "1px solid #222", padding: "6px 14px", fontSize: 11, cursor: "pointer", width: "100%", outline: "none"
            }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
 
        <div style={{ fontSize: 12, color: "#444", marginBottom: 24, letterSpacing: 1 }}>{filtered.length} PRODUCTS</div>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} addedId={addedId} />
          ))}
        </div>
 
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, marginBottom: 8 }}>NO PRODUCTS FOUND</div>
            <div style={{ fontSize: 13, color: "#555" }}>Try adjusting your filters.</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopPage;
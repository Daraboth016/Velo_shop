import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import allProducts from "../data/allProducts";
import saleProducts from "../data/saleProducts";
import { useCart } from "../context/CartContext";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const items = useMemo(() => [...allProducts, ...saleProducts], []);
  const popularSearches = ["Shimano", "SRAM", "Brakes", "Tires", "Wheels"];

  useEffect(() => {
    if (!isOpen) return;
    try {
      setRecentSearches(
        JSON.parse(localStorage.getItem("veloshop-recent-searches")) || [],
      );
    } catch {
      setRecentSearches([]);
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 6);
    const normalizedQuery = query.toLowerCase();
    return items
      .filter((item) =>
        `${item.name} ${item.brand} ${item.category}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 8);
  }, [items, query]);

  const searchFor = (value) => {
    setQuery(value);
    const nextRecent = [
      value,
      ...recentSearches.filter((item) => item !== value),
    ].slice(0, 4);
    setRecentSearches(nextRecent);
    localStorage.setItem(
      "veloshop-recent-searches",
      JSON.stringify(nextRecent),
    );
  };

  const quickAdd = (item) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1100);
  };

  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 92,
        zIndex: 200,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(800px, calc(100% - 28px))",
          background: "#101010",
          border: "1px solid #303030",
          boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
          maxHeight: "78vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 22px 16px",
            borderBottom: "1px solid #242424",
            background: "linear-gradient(135deg, #151515, #101010)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#FF5500" }}>
                VELOSHOP FINDER
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28,
                  letterSpacing: 1,
                  marginTop: 4,
                }}
              >
                FIND YOUR NEXT PART
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              style={{
                border: "1px solid #333",
                background: "#181818",
                color: "#bbb",
                width: 34,
                height: 34,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF5500"
              strokeWidth="2"
              style={{ position: "absolute", left: 15, top: 14 }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query.trim())
                  searchFor(query.trim());
              }}
              placeholder="Search components, brands, categories..."
              style={{
                width: "100%",
                background: "#191919",
                border: "1px solid #3a3a3a",
                color: "#F0F0F0",
                padding: "14px 74px 14px 44px",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: 14,
                top: 14,
                color: "#555",
                fontSize: 10,
                border: "1px solid #333",
                padding: "3px 5px",
              }}
            >
              ESC
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginTop: 13,
              alignItems: "center",
            }}
          >
            <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>
              POPULAR
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => searchFor(term)}
                style={chipStyle}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: "16px 22px 24px",
            maxHeight: "52vh",
            overflowY: "auto",
          }}
        >
          {!query && recentSearches.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: "#666",
                  fontSize: 10,
                  letterSpacing: 2,
                  marginBottom: 9,
                }}
              >
                RECENT SEARCHES
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    style={{ ...chipStyle, color: "#aaa" }}
                  >
                    ↗ {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div style={{ color: "#888", fontSize: 10, letterSpacing: 2 }}>
              {query ? `${results.length} MATCHES` : "FEATURED COMPONENTS"}
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/shop");
                onClose();
              }}
              style={{
                background: "none",
                border: "none",
                color: "#FF5500",
                cursor: "pointer",
                fontSize: 11,
              }}
            >
              VIEW ALL SHOP →
            </button>
          </div>
          {results.length === 0 ? (
            <div
              style={{ color: "#777", padding: "36px 0", textAlign: "center" }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>⌕</div>
              <div style={{ color: "#bbb", fontWeight: 600 }}>
                NO PARTS FOUND
              </div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                Try a brand, category, or a shorter search.
              </div>
            </div>
          ) : (
            results.map((item) => (
              <div
                key={`${item.id}-${item.name}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 0",
                  borderTop: "1px solid #232323",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    navigate("/shop");
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    background: "none",
                    border: "none",
                    color: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${item.color || "#1f1f1f"}, #0d0d0d)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 15, color: "#aaa" }}>
                        {item.icon || "•"}
                      </span>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#FF5500",
                        letterSpacing: 1.5,
                      }}
                    >
                      {item.brand.toUpperCase()} · {item.category.toUpperCase()}
                    </div>
                    <div
                      style={{
                        color: "#eee",
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ color: "#666", fontSize: 11, marginTop: 5 }}>
                      ★ {item.rating || "New"} rating
                    </div>
                  </div>
                </button>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 23,
                      color: item.originalPrice ? "#FF5500" : "#eee",
                    }}
                  >
                    ${item.price}
                  </div>
                  {item.originalPrice && (
                    <div
                      style={{
                        color: "#555",
                        textDecoration: "line-through",
                        fontSize: 11,
                      }}
                    >
                      ${item.originalPrice}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => quickAdd(item)}
                    style={{
                      marginTop: 7,
                      background: addedId === item.id ? "#00b894" : "#FF5500",
                      border: "none",
                      color: "#fff",
                      minWidth: 66,
                      padding: "8px 9px",
                      fontSize: 9,
                      letterSpacing: 1,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {addedId === item.id ? "ADDED ✓" : "ADD +"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const chipStyle = {
  background: "#191919",
  border: "1px solid #303030",
  color: "#999",
  padding: "6px 9px",
  fontSize: 10,
  cursor: "pointer",
};
export default SearchModal;

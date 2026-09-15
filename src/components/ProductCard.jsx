import React from "react";

const ProductCard = ({ product, onAdd, addedId }) => (
  <div
    style={{
      background: "#0f0f0f",
      position: "relative",
      overflow: "hidden",
      transition: "transform .2s",
      border: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div
      style={{
        height: 230,
        background: `linear-gradient(135deg, ${product.color} 0%, #101010 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 18,
      }}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: "92%",
            maxHeight: "88%",
            objectFit: "contain",
            filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.45))",
          }}
        />
      ) : (
        <span style={{ fontSize: 56 }}>{product.icon}</span>
      )}
      {product.badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "#FF5500",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 10px",
            letterSpacing: 1,
          }}
        >
          {product.badge.toUpperCase()}
        </span>
      )}
    </div>
    <div style={{ padding: "18px 20px 22px" }}>
      <div
        style={{
          fontSize: 9,
          color: "#444",
          letterSpacing: 2,
          marginBottom: 6,
        }}
      >
        {product.brand.toUpperCase()} / {product.category.toUpperCase()}
      </div>
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          margin: "0 0 12px",
          lineHeight: 1.5,
          color: "#F0F0F0",
        }}
      >
        {product.name}
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 22,
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#F0F0F0",
              letterSpacing: 1,
            }}
          >
            ${product.price}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 13,
                color: "#444",
                textDecoration: "line-through",
                marginLeft: 8,
              }}
            >
              ${product.originalPrice}
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, color: "#FF5500" }}>
          {product.rating} / 5
        </span>
      </div>
      <button
        onClick={() => onAdd(product.id)}
        style={{
          width: "100%",
          marginTop: 16,
          background: addedId === product.id ? "#00d4aa" : "#FF5500",
          color: "#fff",
          border: "none",
          padding: "11px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          cursor: "pointer",
          transition: "background .15s ease",
        }}
      >
        {addedId === product.id ? "ADDED TO CART" : "ADD TO CART"}
      </button>
    </div>
  </div>
);

export default ProductCard;

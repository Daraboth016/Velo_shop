import { FiArrowRight, FiX } from "react-icons/fi";

const ProductComparison = ({ products, onRemove, onClear }) => {
  if (!products.length) return null;

  const specificationKeys = [
    ...new Set(products.flatMap((product) => Object.keys(product.specifications || {}))),
  ];

  return (
    <aside className="comparison-panel" aria-label="Product comparison">
      <div className="comparison-panel__header">
        <div>
          <p className="eyebrow">Side-by-side</p>
          <h2>Compare <em>components.</em></h2>
        </div>
        <button type="button" onClick={onClear}>Clear all</button>
      </div>
      <div className="comparison-table">
        <div className="comparison-row comparison-row--products">
          <div className="comparison-label">Product</div>
          {products.map((product) => (
            <div className="comparison-product" key={product.id}>
              <button type="button" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}><FiX /></button>
              <img src={product.image} alt="" />
              <strong>{product.name}</strong>
              <span>${product.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        {specificationKeys.map((key) => (
          <div className="comparison-row" key={key}>
            <div className="comparison-label">{key}</div>
            {products.map((product) => (
              <div key={`${product.id}-${key}`}>{product.specifications?.[key] || "—"}</div>
            ))}
          </div>
        ))}
        <div className="comparison-row comparison-row--rating">
          <div className="comparison-label">Rating</div>
          {products.map((product) => <div key={product.id}>{product.rating} / 5</div>)}
        </div>
      </div>
      <div className="comparison-panel__footer">
        <span>{products.length} of 3 products selected</span>
        <FiArrowRight />
      </div>
    </aside>
  );
};

export default ProductComparison;

import { FiArrowUpRight, FiStar } from "react-icons/fi";

const ProductCard = ({ product, onAdd, addedId, onCompare, isCompared, comparisonFull }) => (
  <article className="product-card">
    <div className="product-card__visual" style={{ "--product-color": product.color }}>
      <div className="product-card__meta">
        <span>{product.brand}</span>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
      </div>
      <img src={product.image} alt={product.name} />
      <button type="button" className="product-card__quick" aria-label={`View ${product.name}`}>
        <FiArrowUpRight />
      </button>
    </div>
    <div className="product-card__body">
      <p className="product-card__category">{product.category}</p>
      <h3>{product.name}</h3>
      <div className="product-card__details">
        <div>
          <strong>${product.price.toLocaleString()}</strong>
          {product.originalPrice && <del>${product.originalPrice.toLocaleString()}</del>}
        </div>
        <span className="product-card__rating"><FiStar /> {product.rating}</span>
      </div>
      <button type="button" className={`product-card__add${addedId === product.id ? " is-added" : ""}`} onClick={onAdd}>
        {addedId === product.id ? "Added to cart" : "Add to cart"}
        <FiArrowUpRight />
      </button>
      {onCompare && (
        <label className="product-card__compare">
          <input
            type="checkbox"
            checked={isCompared}
            disabled={!isCompared && comparisonFull}
            onChange={() => onCompare(product)}
          />
          <span>{isCompared ? "Compared" : comparisonFull ? "Comparison full" : "Compare"}</span>
        </label>
      )}
    </div>
  </article>
);

export default ProductCard;

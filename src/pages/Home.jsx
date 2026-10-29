import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import allProducts from "../data/allProducts";
import brandsData from "../data/brandsData";
import bannerSramImg from "../assets/banner/BannerSram.png";
import campagnoloBannerImg from "../assets/banner/Campagnolo banner.png";
import shimanoCuesBannerImg from "../assets/banner/ShimanoCues.png";

const heroBanners = [
  {
    image: bannerSramImg,
    kicker: "Race-ready components",
    title: "Build your fastest ride yet.",
    description: "Precision parts for riders who measure the ride in watts, weekends, and wide-open roads.",
  },
  {
    image: shimanoCuesBannerImg,
    kicker: "New trail standard",
    title: "More control. More adventure.",
    description: "Confident shifting and dependable performance for the routes beyond the pavement.",
  },
  {
    image: campagnoloBannerImg,
    kicker: "Italian racing heritage",
    title: "Performance, refined.",
    description: "Timeless design and modern engineering for a cockpit that feels as good as it looks.",
  },
];

const categoryDetails = {
  Drivetrain: "Power transfer",
  Brakes: "Control & confidence",
  Wheels: "Speed, redefined",
  Suspension: "Own the rough",
  Tires: "Find your grip",
  Cockpit: "Dial in your fit",
};

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveBanner((current) => (current + 1) % heroBanners.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const categories = useMemo(
    () => [...new Set(allProducts.map((product) => product.category))],
    [],
  );
  const featuredProducts = useMemo(() => {
    const filtered = activeCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);
    return filtered.slice(0, 6);
  }, [activeCategory]);

  const handleAdd = (product) => {
    if (!addToCart(product)) {
      navigate("/account");
      return;
    }
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1200);
  };

  const banner = heroBanners[activeBanner];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero__wash" />
        <div className="hero__content page-shell">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <span className="eyebrow__dot" />
              VeloShop / {String(activeBanner + 1).padStart(2, "0")}
            </p>
            <p className="hero__kicker">{banner.kicker}</p>
            <h1>{banner.title}</h1>
            <p className="hero__description">{banner.description}</p>
            <div className="hero__actions">
              <Link className="button button--primary" to="/shop">
                Shop components <FiArrowUpRight />
              </Link>
              <Link className="button button--quiet" to="/about">
                Why VeloShop
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-frame">
              <img src={banner.image} alt="" key={banner.image} />
            </div>
            <div className="hero__spec">
              <span>01</span>
              <span>Engineered for motion</span>
            </div>
          </div>
          <div className="hero__controls">
            <button type="button" aria-label="Previous hero slide" onClick={() => setActiveBanner((activeBanner - 1 + heroBanners.length) % heroBanners.length)}>
              <FiChevronLeft />
            </button>
            <div className="hero__progress">
              {heroBanners.map((item, index) => (
                <button
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  className={index === activeBanner ? "is-active" : ""}
                  key={item.title}
                  onClick={() => setActiveBanner(index)}
                />
              ))}
            </div>
            <button type="button" aria-label="Next hero slide" onClick={() => setActiveBanner((activeBanner + 1) % heroBanners.length)}>
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className="hero__rail">RIDE FURTHER <span>SCROLL TO EXPLORE</span></div>
      </section>

      <section className="trust-strip">
        <div className="page-shell trust-strip__inner">
          <div><FiCheck /> Genuine components, always</div>
          <div><FiCheck /> Fast dispatch from our workshop</div>
          <div><FiCheck /> Advice from riders who know</div>
        </div>
      </section>

      <section className="section page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Curated for the ride</p>
            <h2>Shop by <em>discipline.</em></h2>
          </div>
          <Link className="text-link" to="/shop">View all components <FiArrowUpRight /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const product = allProducts.find((item) => item.category === category);
            return (
              <button
                type="button"
                className="category-tile"
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="category-tile__number">0{index + 1}</span>
                <img src={product.image} alt="" />
                <span className="category-tile__label">
                  <strong>{category}</strong>
                  <small>{categoryDetails[category] || "Ride essentials"}</small>
                </span>
                <FiArrowUpRight />
              </button>
            );
          })}
        </div>
      </section>

      <section className="section section--featured" id="featured">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / The Velo edit</p>
              <h2>Parts worth <em> obsessing over.</em></h2>
            </div>
            <div className="filter-pills" aria-label="Filter featured products">
              {["All", ...categories].map((category) => (
                <button
                  type="button"
                  className={activeCategory === category ? "is-active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="product-grid product-grid--home">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => handleAdd(product)}
                addedId={addedId}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="brand-band">
        <div className="page-shell">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">03 / The names behind the ride</p>
              <h2>Only the <em>good stuff.</em></h2>
            </div>
            <Link className="text-link" to="/brands">Explore brands <FiArrowUpRight /></Link>
          </div>
          <div className="brand-list">
            {brandsData.map((brand) => (
              <Link to="/brands" className="brand-list__item" key={brand.name}>
                <span>{brand.name}</span>
                <small>{brand.country} · {brand.products}+ products</small>
                <FiArrowUpRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto page-shell">
        <div className="manifesto__mark">V</div>
        <div>
          <p className="eyebrow">Ride with intention</p>
          <h2>Every component<br /><em>has a purpose.</em></h2>
        </div>
        <p className="manifesto__copy">From first tune-up to finish-line upgrades, we make it easier to choose parts that make your bike feel more like yours.</p>
        <Link className="button button--outline" to="/about">Our story <FiArrowUpRight /></Link>
      </section>
    </div>
  );
};

export default Home;

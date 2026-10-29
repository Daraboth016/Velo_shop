const PageHeader = ({ eyebrow, title, accent, subtitle }) => (
  <section className="page-header">
    <div className="page-header__inner">
      <div className="page-header__eyebrow">{eyebrow}</div>
      <h1 className="page-header__title">
        {title} <span style={{ color: "#FF5500" }}>{accent}</span>
      </h1>
      <p className="page-header__subtitle">{subtitle}</p>
    </div>
  </section>
);

export default PageHeader;

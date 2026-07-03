import type { CatalogCard as CatalogCardData } from "../config/siteContent";

type CatalogCardProps = {
  card: CatalogCardData;
  featured?: boolean;
  onNavigateSection: (sectionId: string) => void;
};

export function CatalogCard({ card, featured = false, onNavigateSection }: CatalogCardProps) {
  return (
    <article className={`catalog-card ${featured ? "is-featured" : ""}`}>
      <div className="catalog-card-media">
        <img src={card.image} alt={card.imageAlt} />
      </div>
      <div className="catalog-card-copy">
        {card.badge ? <p className="catalog-badge">{card.badge}</p> : <p className="catalog-eyebrow">{card.eyebrow}</p>}
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        {card.details ? <p className="muted-copy">{card.details}</p> : null}
        <a
          className="button card catalog-link"
          href="#form"
          onClick={(event) => {
            event.preventDefault();
            onNavigateSection("form");
          }}
        >
          Подробнее
        </a>
      </div>
    </article>
  );
}

import { selfLoveCards } from "../shared/config/siteContent";
import { CatalogCard } from "../shared/ui/CatalogCard";
import { SectionHeading } from "../shared/ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="catalog-section section" id="about">
      <SectionHeading eyebrow="О себе" title="Любовь к себе как часть формы">
        Тело меняется устойчивее, когда тренировки становятся заботой, а не наказанием за еду или отдых.
      </SectionHeading>

      <div className="catalog-stack">
        {selfLoveCards.map((card) => (
          <CatalogCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

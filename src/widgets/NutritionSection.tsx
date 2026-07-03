import { nutritionCards } from "../shared/config/siteContent";
import { CatalogCard } from "../shared/ui/CatalogCard";
import { SectionHeading } from "../shared/ui/SectionHeading";

export function NutritionSection() {
  return (
    <section className="catalog-section section" id="nutrition">
      <SectionHeading eyebrow="Питание" title="Питание без срывов и жестких запретов">
        Рацион, привычки и тренировки соединены в понятный план: что есть, как держать режим и когда менять нагрузку.
      </SectionHeading>

      <div className="catalog-stack">
        {nutritionCards.map((card, index) => (
          <CatalogCard key={card.title} card={card} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}

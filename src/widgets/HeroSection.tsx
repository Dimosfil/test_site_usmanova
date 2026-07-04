import { ClipboardList } from "lucide-react";
import { assetPath } from "../shared/lib/assets";
import { Button } from "../shared/ui/Button";

type HeroSectionProps = {
  onNavigateSection: (sectionId: string) => void;
};

export function HeroSection({ onNavigateSection }: HeroSectionProps) {
  return (
    <section className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">Фитнес без голода и перегруза</p>
        <h1>Приведите тело в форму с тренером Сашей Белоконовой</h1>
        <p className="hero-subtitle">без диет, голода и запретов с пользой для здоровья</p>
        <p className="lead">
          Похудеть, подтянуть живот и ягодицы, вернуться к тренировкам после паузы или наладить питание без
          жестких запретов - подберем спокойный план под вашу цель.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href="#programs"
            onClick={(event) => {
              event.preventDefault();
              onNavigateSection("programs");
            }}
          >
            Выбрать программу
          </a>
          <Button variant="secondary" onClick={() => onNavigateSection("form")}>
            <ClipboardList size={18} aria-hidden />
            Быстрый подбор
          </Button>
        </div>
        <p className="microcopy">Подбор бесплатный. Ответ появится прямо на странице.</p>
      </div>

      <div className="hero-visual" aria-label="Фото тренера Саши Белоконовой">
        <img src={assetPath("assets/fit-hero-lunge.png")} alt="Фитнес-тренер выполняет выпад с гантелью" />
      </div>

      <div className="hero-mobile-cta">
        <div className="hero-actions">
          <a
            className="button primary"
            href="#programs"
            onClick={(event) => {
              event.preventDefault();
              onNavigateSection("programs");
            }}
          >
            Выбрать программу
          </a>
          <Button variant="secondary" onClick={() => onNavigateSection("form")}>
            <ClipboardList size={18} aria-hidden />
            Быстрый подбор
          </Button>
        </div>
        <p className="microcopy">Подбор бесплатный. Ответ появится прямо на странице.</p>
      </div>
    </section>
  );
}

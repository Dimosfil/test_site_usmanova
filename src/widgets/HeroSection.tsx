import { ClipboardList } from "lucide-react";
import { Button } from "../shared/ui/Button";

function scrollToForm() {
  document.querySelector("#form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
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
          <a className="button primary" href="#programs">
            Выбрать программу
          </a>
          <Button variant="secondary" onClick={scrollToForm}>
            <ClipboardList size={18} aria-hidden />
            Быстрый подбор
          </Button>
        </div>
        <p className="microcopy">Подбор бесплатный. Ответ появится прямо на странице.</p>
      </div>

      <div className="hero-visual" aria-label="Фото тренера Саши Белоконовой">
        <img src="/assets/fit-hero-lunge.png" alt="Фитнес-тренер выполняет выпад с гантелью" />
      </div>
    </section>
  );
}

import { ArrowLeft, CheckCircle2, Sparkles, Target } from "lucide-react";
import type { Program } from "../shared/config/siteContent";
import { findProgramDetails } from "../shared/config/siteContent";
import { Button } from "../shared/ui/Button";

type ProgramDetailPageProps = {
  program: Program;
  onBack: () => void;
  onChoose: () => void;
};

export function ProgramDetailPage({ program, onBack, onChoose }: ProgramDetailPageProps) {
  const detail = findProgramDetails(program.id);
  const Icon = program.Icon;

  return (
    <main className="program-detail-page" id="top">
      <section className="program-detail section">
        <div className="detail-shell">
          <Button className="detail-back" variant="secondary" onClick={onBack}>
            <ArrowLeft size={18} aria-hidden />
            Ко всем программам
          </Button>

          <article className="detail-hero-card">
            <div className="detail-hero-media">
              <img src={program.image} alt={program.imageAlt} />
            </div>

            <div className="detail-hero-copy">
              <p className="tag">
                <Icon size={17} aria-hidden />
                {program.duration}
              </p>
              <p className="detail-label">{detail.label}</p>
              <h1>{detail.headline}</h1>
              <p className="detail-intro">{detail.intro}</p>
              <div className="detail-actions">
                <Button onClick={onChoose}>Подобрать эту программу</Button>
                <Button variant="secondary" onClick={onBack}>
                  Смотреть другие
                </Button>
              </div>
            </div>
          </article>

          <div className="detail-grid">
            <section className="detail-panel">
              <div className="detail-panel-title">
                <Target size={22} aria-hidden />
                <h2>Кому подойдет</h2>
              </div>
              <ul className="detail-list">
                {detail.bestFor.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-panel">
              <div className="detail-panel-title">
                <Sparkles size={22} aria-hidden />
                <h2>Что внутри</h2>
              </div>
              <ul className="detail-list">
                {detail.includes.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="detail-summary">
            <article>
              <p className="eyebrow">Формат</p>
              <h2>Как проходит</h2>
              <p>{detail.format}</p>
            </article>
            <article>
              <p className="eyebrow">Результат</p>
              <h2>Что почувствуете</h2>
              <p>{detail.result}</p>
            </article>
            <article>
              <p className="eyebrow">Поддержка</p>
              <h2>Почему получится</h2>
              <p>{detail.support}</p>
            </article>
          </section>

          <section className="detail-final">
            <h2>{program.title}: спокойный старт без лишней сложности</h2>
            <p>
              Если цель похожа на вашу, можно сразу перейти к подбору. Форма сохранит выбранную программу и
              покажет подтверждение прямо на странице.
            </p>
            <Button onClick={onChoose}>Перейти к подбору</Button>
          </section>
        </div>
      </section>
    </main>
  );
}

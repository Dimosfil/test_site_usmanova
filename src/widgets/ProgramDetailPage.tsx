import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  CircleHelp,
  Dumbbell,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type { Program } from "../shared/config/siteContent";
import {
  detailAssurances,
  detailCoachFacts,
  detailComparisons,
  detailFaq,
  detailMetrics,
  detailOffers,
  detailOutcomes,
  findProgramDetails,
} from "../shared/config/siteContent";
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

          <div className="detail-grid" id="detail-fit">
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

          <section className="detail-metrics" aria-label="Ключевые параметры программы">
            {detailMetrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </section>

          <section className="detail-section">
            <div className="detail-section-heading">
              <p className="eyebrow">После старта</p>
              <h2>Меняется не только фигура</h2>
              <p>
                Программа держится не на обещании "потерпеть", а на ощущении, что тело снова под контролем:
                больше сил, меньше хаоса и понятный следующий шаг.
              </p>
            </div>
            <div className="detail-three">
              {detailOutcomes.map((item) => (
                <article className="detail-panel compact" key={item.title}>
                  <Sparkles size={22} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section detail-contents" id="detail-contents">
            <div className="detail-section-heading align-left">
              <p className="eyebrow">Внутри маршрута</p>
              <h2>Все для результата собрано заранее</h2>
              <p>
                Вы не собираете программу из разрозненных роликов: тренировки, питание, восстановление и понятный
                порядок действий упакованы в один сценарий.
              </p>
            </div>
            <div className="detail-content-layout">
              <div className="detail-panel">
                <div className="detail-panel-title">
                  <Dumbbell size={22} aria-hidden />
                  <h3>{program.title}</h3>
                </div>
                <ul className="detail-list">
                  {detail.includes.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={18} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-panel detail-rhythm">
                <p className="eyebrow">Ритм</p>
                <h3>Как не бросить на второй неделе</h3>
                <p>{detail.format}</p>
                <p>{detail.support}</p>
              </div>
            </div>
          </section>

          <section className="detail-section" id="offers">
            <div className="detail-section-heading">
              <p className="eyebrow">Форматы</p>
              <h2>Выберите объем поддержки</h2>
              <p>Можно начать с базового набора, взять расширенный маршрут или открыть максимум материалов сразу.</p>
            </div>
            <div className="detail-offers">
              {detailOffers.map((offer) => (
                <article className="detail-offer" key={offer.title}>
                  <div>
                    <p className="eyebrow">Тариф</p>
                    <h3>{offer.title}</h3>
                    {offer.badge ? <p className="detail-label">{offer.badge}</p> : null}
                  </div>
                  <div className="detail-price">
                    <strong>{offer.price}</strong>
                    <span>{offer.oldPrice}</span>
                    <em>{offer.discount}</em>
                  </div>
                  <p className="muted-copy">{offer.access}</p>
                  <ul className="detail-list">
                    {offer.includes.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={18} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="detail-offer-button" onClick={onChoose}>
                    Забрать формат
                  </Button>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section" id="detail-system">
            <div className="detail-section-heading">
              <p className="eyebrow">Почему система</p>
              <h2>Работает там, где обычно все рассыпается</h2>
            </div>
            <div className="detail-three">
              {detailComparisons.map((item) => (
                <article className="detail-panel compact" key={item.title}>
                  <Target size={22} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-coach" id="detail-coach">
            <div className="detail-coach-copy">
              <p className="eyebrow">С тренером</p>
              <h2>Вы идете с Сашей, а не с безликим списком упражнений</h2>
              <p>
                Саша объясняет не только что повторять, но и зачем это движение нужно телу, как упростить нагрузку
                и когда можно добавить интенсивность.
              </p>
            </div>
            <div className="detail-coach-list">
              {detailCoachFacts.map((item) => (
                <article key={item.title}>
                  <HeartHandshake size={22} aria-hidden />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <div className="detail-section-heading">
              <p className="eyebrow">Гарантии</p>
              <h2>Понятные условия до заявки</h2>
            </div>
            <div className="detail-assurance-grid">
              {detailAssurances.map((item) => (
                <article key={item.title}>
                  <ShieldCheck size={20} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-faq" id="detail-faq">
            <div className="detail-section-heading align-left">
              <p className="eyebrow">Вопросы</p>
              <h2>Перед стартом</h2>
            </div>
            <div className="detail-faq-list">
              {detailFaq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    <CircleHelp size={20} aria-hidden />
                    {item.question}
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="detail-final">
            <BadgePercent size={28} aria-hidden />
            <h2>{program.title}: способ один — понятная система</h2>
            <p>
              Если цель похожа на вашу, можно сразу перейти к подбору. Форма сохранит выбранную программу,
              выбранное направление попадет в заявку, а подтверждение появится прямо на странице.
            </p>
            <Button onClick={onChoose}>Перейти к подбору</Button>
          </section>
        </div>
      </section>
    </main>
  );
}

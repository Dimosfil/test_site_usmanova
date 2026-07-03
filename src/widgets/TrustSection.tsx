import { SectionHeading } from "../shared/ui/SectionHeading";

const proofs = [
  "Сертифицированный тренер по силовой и функциональной подготовке.",
  "Подбирает нагрузку под уровень: новичок, возвращение после паузы, зал или дом.",
  "Дает простую структуру питания без запретов и подсчета каждой крошки.",
  "Делает акцент на технику, восстановление и устойчивый режим.",
];

const photos = [
  {
    src: "/assets/program-home.png",
    alt: "Тренировка с фитнес-резинкой в светлой студии",
    caption: "Домашние тренировки",
  },
  {
    src: "/assets/program-food.png",
    alt: "Сбалансированный обед, бутылка воды и тренировочная резинка",
    caption: "Питание без крайностей",
  },
  {
    src: "/assets/program-gym.png",
    alt: "Тренировка с гантелями в современном зале",
    caption: "Силовой прогресс",
  },
];

export function TrustSection() {
  return (
    <section className="trust section" id="trust">
      <SectionHeading eyebrow="Почему доверяют" title="Спокойная система вместо хаотичных марафонов">
        Саша собирает план так, чтобы тренировки вписывались в неделю, питание оставалось нормальной жизнью, а
        результат было видно по самочувствию, силе и объемам.
      </SectionHeading>

      <div className="trust-grid">
        <article className="trust-panel">
          <ul className="proof-list">
            {proofs.map((proof, index) => (
              <li key={proof}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {proof}
              </li>
            ))}
          </ul>
        </article>

        <div className="photo-strip" aria-label="Фото о подходе тренера">
          {photos.map((photo) => (
            <figure key={photo.caption}>
              <img src={photo.src} alt={photo.alt} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

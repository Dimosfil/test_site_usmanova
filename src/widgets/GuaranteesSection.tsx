import { guarantees } from "../shared/config/siteContent";

export function GuaranteesSection() {
  return (
    <section className="guarantees section" id="guarantees">
      <div className="guarantees-inner">
        <h2>
          Программы <span>Саши Белоконовой</span> - это всегда гарантия
        </h2>

        <div className="guarantee-list">
          {guarantees.map((guarantee) => {
            const Icon = guarantee.Icon;

            return (
              <article className="guarantee-item" key={guarantee.title}>
                <span className="guarantee-icon">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <h3>{guarantee.title}</h3>
                  <p>{guarantee.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

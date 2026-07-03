import { Send } from "lucide-react";
import { socialLinks } from "../shared/config/siteContent";

type ContactSectionProps = {
  onNavigateSection: (sectionId: string) => void;
};

export function ContactSection({ onNavigateSection }: ContactSectionProps) {
  return (
    <section className="contact-section section" id="contacts">
      <h2>Не знаете, с чего начать?</h2>
      <div className="contact-card">
        <p>Напишите нам, и мы подберем программу под вашу цель и уровень. Это бесплатно и быстро.</p>
        <div className="social-row" aria-label="Ссылки для связи">
          {socialLinks.map((link) => (
            <a
              className={`social-link social-${link.short.toLowerCase()}`}
              href={link.href}
              key={link.label}
              onClick={(event) => {
                if (!link.href.startsWith("#")) {
                  return;
                }

                event.preventDefault();
                onNavigateSection(link.href.slice(1));
              }}
            >
              {link.short === "TG" ? <Send size={28} aria-hidden /> : <span>{link.short}</span>}
              <span className="visually-hidden">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

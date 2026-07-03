import { Send } from "lucide-react";
import { socialLinks } from "../shared/config/siteContent";

export function ContactSection() {
  return (
    <section className="contact-section section" id="contacts">
      <h2>Не знаете, с чего начать?</h2>
      <div className="contact-card">
        <p>Напишите нам, и мы подберем программу под вашу цель и уровень. Это бесплатно и быстро.</p>
        <div className="social-row" aria-label="Ссылки для связи">
          {socialLinks.map((link) => (
            <a className={`social-link social-${link.short.toLowerCase()}`} href={link.href} key={link.label}>
              {link.short === "TG" ? <Send size={28} aria-hidden /> : <span>{link.short}</span>}
              <span className="visually-hidden">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { legalLinks, socialLinks } from "../shared/config/siteContent";

type FooterProps = {
  onNavigateSection: (sectionId: string) => void;
};

export function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-copy">
        <p className="footer-company">© ООО «Онлайн Фитнес», 2020 - 2026.</p>
        <p>ИНН 7734434533</p>
        <p>КПП 773401001</p>
        <p>ОГРН 1207700175209</p>
        <p className="footer-address">г. Москва, ул. Щукинская, д.2, этаж/офис цокольный/32</p>
      </div>

      <nav className="footer-links" aria-label="Юридическая информация">
        {legalLinks.map((link) => (
          <a
            href="#contacts"
            key={link}
            onClick={(event) => {
              event.preventDefault();
              onNavigateSection("contacts");
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="footer-socials" aria-label="Социальные сети">
        {socialLinks.slice(0, 3).map((link) => (
          <a
            className={`footer-social social-${link.short.toLowerCase()}`}
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
            {link.short}
          </a>
        ))}
      </div>
    </footer>
  );
}

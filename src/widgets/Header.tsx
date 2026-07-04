import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SiteSettingsMenu } from "../features/site-settings/SiteSettingsMenu";
import type { LogoId, ThemeId } from "../shared/config/siteContent";
import { logos } from "../shared/config/siteContent";

type HeaderProps = {
  activeLogo: LogoId;
  activeTheme: ThemeId;
  savedLogo: LogoId;
  savedTheme: ThemeId;
  onLogoPreview: (logo: LogoId) => void;
  onSettingsSave: (settings: { logo: LogoId; theme: ThemeId }) => void;
  onThemePreview: (theme: ThemeId) => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePrograms: () => void;
  isProgramDetail?: boolean;
};

const landingNavItems = [
  { id: "trust", label: "Опыт" },
  { id: "programs", label: "Программы" },
  { id: "nutrition", label: "Питание" },
  { id: "about", label: "О себе" },
  { id: "guarantees", label: "Гарантии" },
  { id: "contacts", label: "Контакты" },
  { id: "form", label: "Подбор" },
];

const detailNavItems = [
  { id: "top", label: "Обзор" },
  { id: "detail-fit", label: "Кому" },
  { id: "detail-contents", label: "Внутри" },
  { id: "offers", label: "Форматы" },
  { id: "detail-system", label: "Система" },
  { id: "detail-coach", label: "Тренер" },
  { id: "detail-faq", label: "Вопросы" },
];

export function Header({
  activeLogo,
  activeTheme,
  savedLogo,
  savedTheme,
  onLogoPreview,
  onSettingsSave,
  onThemePreview,
  onNavigateHome,
  onNavigateSection,
  onNavigatePrograms,
  isProgramDetail = false,
}: HeaderProps) {
  const navItems = isProgramDetail ? detailNavItems : landingNavItems;
  const logo = logos.find((item) => item.id === activeLogo) ?? logos[0];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function navigateAndClose(sectionId: string) {
    onNavigateSection(sectionId);
    setIsMenuOpen(false);
  }

  function navigateProgramsAndClose() {
    onNavigatePrograms();
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header" aria-label="Главная навигация">
      <a
        className="brand"
        href="#top"
        aria-label="Саша Белоконова, на первый экран"
        onClick={(event) => {
          event.preventDefault();
          onNavigateHome();
          setIsMenuOpen(false);
        }}
      >
        <span className={`brand-mark logo-mark logo-${logo.id}`}>{logo.mark}</span>
        <span>Саша Белоконова</span>
      </a>

      <button
        aria-controls="main-nav"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        className="nav-menu-toggle"
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        {isMenuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      <nav className={`main-nav${isMenuOpen ? " is-open" : ""}`} id="main-nav" aria-label="Разделы сайта">
        {isProgramDetail ? (
          <a
            href="#programs"
            onClick={(event) => {
              event.preventDefault();
              navigateProgramsAndClose();
            }}
          >
            Программы
          </a>
        ) : null}
        {navItems.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            onClick={(event) => {
              event.preventDefault();
              navigateAndClose(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <SiteSettingsMenu
        activeLogo={activeLogo}
        activeTheme={activeTheme}
        savedLogo={savedLogo}
        savedTheme={savedTheme}
        onLogoPreview={onLogoPreview}
        onSave={onSettingsSave}
        onThemePreview={onThemePreview}
      />
    </header>
  );
}

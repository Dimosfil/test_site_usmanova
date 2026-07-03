import { ThemeSwitcher } from "../features/theme-switcher/ThemeSwitcher";
import type { ThemeId } from "../shared/config/siteContent";

type HeaderProps = {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
};

export function Header({ activeTheme, onThemeChange }: HeaderProps) {
  return (
    <header className="site-header" aria-label="Главная навигация">
      <a className="brand" href="#top" aria-label="Саша Белоконова, на первый экран">
        <span className="brand-mark">SB</span>
        <span>Саша Белоконова</span>
      </a>

      <nav className="main-nav" aria-label="Разделы сайта">
        <a href="#trust">Опыт</a>
        <a href="#programs">Программы</a>
        <a href="#nutrition">Питание</a>
        <a href="#about">О себе</a>
        <a href="#guarantees">Гарантии</a>
        <a href="#contacts">Контакты</a>
        <a href="#form">Подбор</a>
      </nav>

      <ThemeSwitcher activeTheme={activeTheme} onThemeChange={onThemeChange} />
    </header>
  );
}

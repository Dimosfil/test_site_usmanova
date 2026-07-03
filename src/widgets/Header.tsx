import { ThemeSwitcher } from "../features/theme-switcher/ThemeSwitcher";
import type { ThemeId } from "../shared/config/siteContent";

type HeaderProps = {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onNavigateHome?: () => void;
};

export function Header({ activeTheme, onThemeChange, onNavigateHome }: HeaderProps) {
  return (
    <header className="site-header" aria-label="Главная навигация">
      <a className="brand" href="#top" aria-label="Саша Белоконова, на первый экран" onClick={onNavigateHome}>
        <span className="brand-mark">SB</span>
        <span>Саша Белоконова</span>
      </a>

      <nav className="main-nav" aria-label="Разделы сайта">
        <a href="#trust" onClick={onNavigateHome}>
          Опыт
        </a>
        <a href="#programs" onClick={onNavigateHome}>
          Программы
        </a>
        <a href="#nutrition" onClick={onNavigateHome}>
          Питание
        </a>
        <a href="#about" onClick={onNavigateHome}>
          О себе
        </a>
        <a href="#guarantees" onClick={onNavigateHome}>
          Гарантии
        </a>
        <a href="#contacts" onClick={onNavigateHome}>
          Контакты
        </a>
        <a href="#form" onClick={onNavigateHome}>
          Подбор
        </a>
      </nav>

      <ThemeSwitcher activeTheme={activeTheme} onThemeChange={onThemeChange} />
    </header>
  );
}

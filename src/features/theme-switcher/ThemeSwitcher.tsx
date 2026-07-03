import { themes, type ThemeId } from "../../shared/config/siteContent";

type ThemeSwitcherProps = {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
};

export function ThemeSwitcher({ activeTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <label className="theme-switcher">
      <span className="visually-hidden">Выбор цветовой темы</span>
      <span className={`swatch swatch-${activeTheme}`} aria-hidden="true" />
      <select value={activeTheme} onChange={(event) => onThemeChange(event.target.value as ThemeId)}>
        {themes.map((theme) => (
          <option value={theme.id} key={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </label>
  );
}

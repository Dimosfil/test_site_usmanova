import { Check, ChevronDown, Settings2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { logos, themes, type LogoId, type ThemeId } from "../../shared/config/siteContent";

type SiteSettingsMenuProps = {
  activeLogo: LogoId;
  activeTheme: ThemeId;
  savedLogo: LogoId;
  savedTheme: ThemeId;
  onLogoPreview: (logo: LogoId) => void;
  onSave: (settings: { logo: LogoId; theme: ThemeId }) => void;
  onThemePreview: (theme: ThemeId) => void;
};

export function SiteSettingsMenu({
  activeLogo,
  activeTheme,
  savedLogo,
  savedTheme,
  onLogoPreview,
  onSave,
  onThemePreview,
}: SiteSettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hasChanges = activeLogo !== savedLogo || activeTheme !== savedTheme;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function saveCurrentSelection() {
    onSave({ logo: activeLogo, theme: activeTheme });
    setIsOpen(false);
  }

  return (
    <div className="settings-menu" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-label="Настройки сайта"
        className="settings-trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <Settings2 size={19} aria-hidden />
        <span className={`swatch swatch-${activeTheme}`} aria-hidden="true" />
        <ChevronDown size={15} aria-hidden />
      </button>

      {isOpen ? (
        <div className="settings-panel" role="menu">
          <div className="settings-group">
            <p className="settings-title">Лого</p>
            <div className="logo-choice-grid">
              {logos.map((logo) => (
                <button
                  aria-pressed={activeLogo === logo.id}
                  className="logo-choice"
                  key={logo.id}
                  onClick={() => onLogoPreview(logo.id)}
                  type="button"
                >
                  <span className={`logo-choice-mark logo-${logo.id}`}>{logo.mark}</span>
                  <span>{logo.label}</span>
                  {activeLogo === logo.id ? <Check size={15} aria-hidden /> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-group">
            <p className="settings-title">Тема</p>
            <div className="theme-choice-grid">
              {themes.map((theme) => (
                <button
                  aria-pressed={activeTheme === theme.id}
                  className="theme-choice"
                  key={theme.id}
                  onClick={() => onThemePreview(theme.id)}
                  type="button"
                >
                  <span className={`swatch swatch-${theme.id}`} aria-hidden="true" />
                  <span>{theme.label}</span>
                  {activeTheme === theme.id ? <Check size={15} aria-hidden /> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-group settings-next">
            <p className="settings-title">Еще</p>
            <button className="settings-disabled" disabled type="button">
              Скоро
            </button>
          </div>

          <div className="settings-actions">
            <span aria-live="polite">{hasChanges ? "Есть изменения" : "Сохранено"}</span>
            <button className="settings-save" disabled={!hasChanges} onClick={saveCurrentSelection} type="button">
              Сохранить
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

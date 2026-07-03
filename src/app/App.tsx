import { useCallback, useEffect, useRef, useState } from "react";
import { AboutSection } from "../widgets/AboutSection";
import { ContactSection } from "../widgets/ContactSection";
import { Footer } from "../widgets/Footer";
import { GuaranteesSection } from "../widgets/GuaranteesSection";
import { Header } from "../widgets/Header";
import { HeroSection } from "../widgets/HeroSection";
import { ProgramDetailPage } from "../widgets/ProgramDetailPage";
import { NutritionSection } from "../widgets/NutritionSection";
import { ProgramsSection } from "../widgets/ProgramsSection";
import { TrustSection } from "../widgets/TrustSection";
import type { LogoId, ProgramId, ThemeId } from "../shared/config/siteContent";
import { findProgram, logos, programs, themes } from "../shared/config/siteContent";

const defaultProgram = programs[0].id;
const programIds = new Set(programs.map((program) => program.id));
const landingSectionIds = new Set(["top", "trust", "programs", "nutrition", "about", "guarantees", "contacts", "form"]);
const detailSectionIds = new Set(["top", "detail-fit", "detail-contents", "offers", "detail-system", "detail-coach", "detail-faq"]);
const scrollOffset = 88;
const minScrollDuration = 760;
const maxScrollDuration = 1500;
const siteSettingsStorageKey = "sasha-fit-site-settings";

type SavedSiteSettings = {
  logo: LogoId;
  theme: ThemeId;
};

function getProgramFromHash(): ProgramId | null {
  const match = window.location.hash.match(/^#program\/(.+)$/);
  const candidate = match ? decodeURIComponent(match[1]) : "";

  return programIds.has(candidate as ProgramId) ? (candidate as ProgramId) : null;
}

function getLandingSectionFromHash(): string | null {
  const candidate = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "top";

  return landingSectionIds.has(candidate) ? candidate : null;
}

function getDetailSectionFromHash(): string | null {
  if (!window.location.hash) {
    return null;
  }

  const candidate = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "top";

  return candidate !== "top" && detailSectionIds.has(candidate) ? candidate : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function isLogoId(value: string): value is LogoId {
  return logos.some((logo) => logo.id === value);
}

function isThemeId(value: string): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

function loadSavedSettings(): SavedSiteSettings {
  if (typeof window === "undefined") {
    return { logo: "core", theme: "rose" };
  }

  try {
    const savedSettings = window.localStorage.getItem(siteSettingsStorageKey);

    if (!savedSettings) {
      return { logo: "core", theme: "rose" };
    }

    const parsedSettings = JSON.parse(savedSettings) as Partial<SavedSiteSettings>;
    const logo = parsedSettings.logo && isLogoId(parsedSettings.logo) ? parsedSettings.logo : "core";
    const theme = parsedSettings.theme && isThemeId(parsedSettings.theme) ? parsedSettings.theme : "rose";

    return { logo, theme };
  } catch {
    return { logo: "core", theme: "rose" };
  }
}

function saveSettings(settings: SavedSiteSettings) {
  window.localStorage.setItem(siteSettingsStorageKey, JSON.stringify(settings));
}

export function App() {
  const [theme, setTheme] = useState<ThemeId>(() => loadSavedSettings().theme);
  const [logo, setLogo] = useState<LogoId>(() => loadSavedSettings().logo);
  const [savedSettings, setSavedSettings] = useState<SavedSiteSettings>(() => loadSavedSettings());
  const [selectedProgram, setSelectedProgram] = useState<ProgramId>(defaultProgram);
  const [activeProgram, setActiveProgram] = useState<ProgramId | null>(null);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const scrollAnimationRef = useRef(0);

  const getSectionTop = useCallback((sectionId: string) => {
    if (sectionId === "top") {
      return 0;
    }

    const target = document.getElementById(sectionId);

    if (!target) {
      return window.scrollY;
    }

    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollOffset);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      window.cancelAnimationFrame(scrollAnimationRef.current);

      const startY = window.scrollY;
      const targetY = getSectionTop(sectionId);
      const distance = targetY - startY;

      if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetY);
        return;
      }

      const duration = clamp(Math.abs(distance) * 0.34, minScrollDuration, maxScrollDuration);
      const startTime = performance.now();

      function step(currentTime: number) {
        const progress = clamp((currentTime - startTime) / duration, 0, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          scrollAnimationRef.current = window.requestAnimationFrame(step);
        }
      }

      scrollAnimationRef.current = window.requestAnimationFrame(step);
    },
    [getSectionTop],
  );

  useEffect(() => {
    function syncRoute() {
      const program = getProgramFromHash();

      if (program) {
        setActiveProgram(program);
        setSelectedProgram(program);
        setPendingSection(null);
        return;
      }

      const detailSection = getDetailSectionFromHash();

      if (detailSection) {
        setActiveProgram((currentProgram) => currentProgram ?? selectedProgram);
        setPendingSection(detailSection);
        return;
      }

      setActiveProgram(null);

      const section = getLandingSectionFromHash();

      if (section) {
        setPendingSection(section);
      }
    }

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, [selectedProgram]);

  useEffect(() => {
    return () => window.cancelAnimationFrame(scrollAnimationRef.current);
  }, []);

  useEffect(() => {
    if (!pendingSection) {
      return;
    }

    const canScrollCurrentPage = activeProgram
      ? detailSectionIds.has(pendingSection)
      : landingSectionIds.has(pendingSection);

    if (!canScrollCurrentPage) {
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        scrollToSection(pendingSection);
        setPendingSection(null);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [activeProgram, pendingSection, scrollToSection]);

  function updateHash(hash: string) {
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  }

  function navigateToSection(sectionId: string) {
    const isDetailSection = activeProgram !== null && detailSectionIds.has(sectionId);

    if (!isDetailSection) {
      setActiveProgram(null);
    }

    setPendingSection(sectionId);
    updateHash(`#${sectionId}`);
  }

  function openProgramDetails(program: ProgramId) {
    window.cancelAnimationFrame(scrollAnimationRef.current);
    setSelectedProgram(program);
    setActiveProgram(program);
    setPendingSection(null);
    updateHash(`#program/${program}`);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  function returnToPrograms() {
    navigateToSection("programs");
  }

  function chooseProgramFromDetails() {
    navigateToSection("form");
  }

  function showProgramOffers() {
    navigateToSection("offers");
  }

  function applySiteSettings(settings: SavedSiteSettings) {
    setSavedSettings(settings);
    saveSettings(settings);
  }

  const activeProgramData = activeProgram ? findProgram(activeProgram) : null;

  return (
    <div data-theme={theme}>
      <Header
        activeLogo={logo}
        activeTheme={theme}
        isProgramDetail={Boolean(activeProgramData)}
        savedLogo={savedSettings.logo}
        savedTheme={savedSettings.theme}
        onLogoPreview={setLogo}
        onSettingsSave={applySiteSettings}
        onThemePreview={setTheme}
        onNavigatePrograms={returnToPrograms}
        onNavigateSection={navigateToSection}
      />
      {activeProgramData ? (
        <div className="page-view" key={`program-${activeProgramData.id}`}>
          <ProgramDetailPage
            program={activeProgramData}
            onBack={returnToPrograms}
            onChoose={chooseProgramFromDetails}
            onShowOffers={showProgramOffers}
          />
        </div>
      ) : (
        <div className="page-view" key="landing">
          <main id="top">
            <HeroSection onNavigateSection={navigateToSection} />
            <TrustSection />
            <ProgramsSection selectedProgram={selectedProgram} onProgramOpen={openProgramDetails} />
            <NutritionSection onNavigateSection={navigateToSection} />
            <AboutSection onNavigateSection={navigateToSection} />
            <GuaranteesSection />
            <ContactSection onNavigateSection={navigateToSection} />
          </main>
        </div>
      )}
      <Footer onNavigateSection={navigateToSection} />
    </div>
  );
}

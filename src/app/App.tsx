import { useEffect, useState } from "react";
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
import type { ProgramId, ThemeId } from "../shared/config/siteContent";
import { findProgram, programs } from "../shared/config/siteContent";

const defaultProgram = programs[0].id;
const programIds = new Set(programs.map((program) => program.id));

function getProgramFromHash(): ProgramId | null {
  const match = window.location.hash.match(/^#program\/(.+)$/);
  const candidate = match ? decodeURIComponent(match[1]) : "";

  return programIds.has(candidate as ProgramId) ? (candidate as ProgramId) : null;
}

export function App() {
  const [theme, setTheme] = useState<ThemeId>("rose");
  const [selectedProgram, setSelectedProgram] = useState<ProgramId>(defaultProgram);
  const [activeProgram, setActiveProgram] = useState<ProgramId | null>(null);

  useEffect(() => {
    function syncProgramRoute() {
      const program = getProgramFromHash();
      setActiveProgram(program);

      if (program) {
        setSelectedProgram(program);
      }
    }

    syncProgramRoute();
    window.addEventListener("hashchange", syncProgramRoute);

    return () => window.removeEventListener("hashchange", syncProgramRoute);
  }, []);

  function scrollTo(selector: string) {
    window.requestAnimationFrame(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openProgramDetails(program: ProgramId) {
    setSelectedProgram(program);
    setActiveProgram(program);
    window.location.hash = `program/${program}`;
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function returnToPrograms() {
    setActiveProgram(null);
    window.location.hash = "programs";
    scrollTo("#programs");
  }

  function chooseProgramFromDetails() {
    setActiveProgram(null);
    window.location.hash = "form";
    scrollTo("#form");
  }

  function showLanding() {
    setActiveProgram(null);
  }

  const activeProgramData = activeProgram ? findProgram(activeProgram) : null;

  return (
    <div data-theme={theme}>
      <Header activeTheme={theme} onThemeChange={setTheme} onNavigateHome={showLanding} />
      {activeProgramData ? (
        <ProgramDetailPage program={activeProgramData} onBack={returnToPrograms} onChoose={chooseProgramFromDetails} />
      ) : (
        <main id="top">
          <HeroSection />
          <TrustSection />
          <ProgramsSection selectedProgram={selectedProgram} onProgramOpen={openProgramDetails} />
          <NutritionSection />
          <AboutSection />
          <GuaranteesSection />
          <ContactSection />
        </main>
      )}
      <Footer />
    </div>
  );
}

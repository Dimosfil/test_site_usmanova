import { useState } from "react";
import { AboutSection } from "../widgets/AboutSection";
import { ContactSection } from "../widgets/ContactSection";
import { Footer } from "../widgets/Footer";
import { GuaranteesSection } from "../widgets/GuaranteesSection";
import { Header } from "../widgets/Header";
import { HeroSection } from "../widgets/HeroSection";
import { NutritionSection } from "../widgets/NutritionSection";
import { ProgramsSection } from "../widgets/ProgramsSection";
import { TrustSection } from "../widgets/TrustSection";
import type { ProgramId, ThemeId } from "../shared/config/siteContent";
import { programs } from "../shared/config/siteContent";

const defaultProgram = programs[0].id;

export function App() {
  const [theme, setTheme] = useState<ThemeId>("rose");
  const [selectedProgram, setSelectedProgram] = useState<ProgramId>(defaultProgram);

  return (
    <div data-theme={theme}>
      <Header activeTheme={theme} onThemeChange={setTheme} />
      <main id="top">
        <HeroSection />
        <TrustSection />
        <ProgramsSection selectedProgram={selectedProgram} onProgramSelect={setSelectedProgram} />
        <NutritionSection />
        <AboutSection />
        <GuaranteesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

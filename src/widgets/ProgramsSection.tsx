import { LeadForm } from "../features/lead-form/LeadForm";
import { ProgramCard } from "../features/program-picker/ProgramCard";
import { programs, type ProgramId } from "../shared/config/siteContent";
import { SectionHeading } from "../shared/ui/SectionHeading";

type ProgramsSectionProps = {
  selectedProgram: ProgramId;
  onProgramOpen: (program: ProgramId) => void;
};

export function ProgramsSection({ selectedProgram, onProgramOpen }: ProgramsSectionProps) {
  return (
    <section className="programs section" id="programs">
      <SectionHeading eyebrow="Программы" title="Выберите направление под вашу цель">
        Тренировки, питание и поддержка собраны в простые маршруты без перегруза.
      </SectionHeading>

      <div className="program-grid" aria-label="Список программ">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onOpen={() => onProgramOpen(program.id)}
          />
        ))}
      </div>

      <div className="picker" id="form">
        <div className="picker-copy">
          <p className="eyebrow">Не знаете, с чего начать?</p>
          <h2>Подберем программу под вашу цель</h2>
          <p>
            Оставьте цель и удобный формат. Форма работает в прототипе: проверяет поля, сохраняет выбранную
            программу и показывает подтверждение.
          </p>
        </div>

        <LeadForm selectedProgram={selectedProgram} />
      </div>
    </section>
  );
}

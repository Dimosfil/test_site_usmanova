import { Check } from "lucide-react";
import type { Program } from "../../shared/config/siteContent";
import { Button } from "../../shared/ui/Button";

type ProgramCardProps = {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
};

export function ProgramCard({ program, isSelected, onSelect }: ProgramCardProps) {
  const Icon = program.Icon;

  return (
    <article className={`program-card ${isSelected ? "is-selected" : ""}`}>
      <div className="program-card-media">
        <img src={program.image} alt={program.imageAlt} />
      </div>
      <div className="program-card-body">
        <p className="tag">
          <Icon size={16} aria-hidden />
          {program.duration}
        </p>
        <h3>{program.title}</h3>
        <p>{program.summary}</p>
        <Button className="card-action" variant="card" onClick={onSelect}>
          {isSelected ? <Check size={18} aria-hidden /> : null}
          {isSelected ? "Выбрано" : "Выбрать"}
        </Button>
      </div>
    </article>
  );
}

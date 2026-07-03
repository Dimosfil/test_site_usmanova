import { Send } from "lucide-react";
import { type FormEvent, useMemo, useRef, useState } from "react";
import { findProgram, goals, type ProgramId } from "../../shared/config/siteContent";
import { Button } from "../../shared/ui/Button";

type LeadFormProps = {
  selectedProgram: ProgramId;
};

type FormStatus = {
  tone: "idle" | "success" | "error";
  text: string;
};

export function LeadForm({ selectedProgram }: LeadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({ tone: "idle", text: "" });
  const program = useMemo(() => findProgram(selectedProgram), [selectedProgram]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setStatus({ tone: "error", text: "Заполните имя, контакт, цель и программу." });
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name")).trim();
    const goal = String(formData.get("goal")).trim();
    const place = String(formData.get("place")).trim();

    setStatus({
      tone: "success",
      text: `${name}, заявка принята: ${program.title}, ${place.toLowerCase()}, цель - ${goal.toLowerCase()}.`,
    });

    form.reset();
  }

  return (
    <form className="lead-form" ref={formRef} noValidate onSubmit={handleSubmit}>
      <label>
        Имя
        <input name="name" type="text" placeholder="Например, Аня" autoComplete="name" required />
      </label>

      <label>
        Телефон или Telegram
        <input name="contact" type="text" placeholder="+7 или @username" autoComplete="tel" required />
      </label>

      <label>
        Цель
        <select name="goal" required defaultValue="">
          <option value="" disabled>
            Выберите цель
          </option>
          {goals.map((goal) => (
            <option key={goal}>{goal}</option>
          ))}
        </select>
      </label>

      <label>
        Интересующая программа
        <input name="program" type="text" value={program.title} readOnly required />
      </label>

      <fieldset>
        <legend>Где удобнее тренироваться?</legend>
        <label className="radio-row">
          <input type="radio" name="place" value="Дом" defaultChecked />
          Дома
        </label>
        <label className="radio-row">
          <input type="radio" name="place" value="Зал" />
          В зале
        </label>
        <label className="radio-row">
          <input type="radio" name="place" value="Смешанный формат" />
          Смешанно
        </label>
      </fieldset>

      <Button className="form-submit" type="submit">
        <Send size={18} aria-hidden />
        Получить подбор
      </Button>
      <p className={`form-message ${status.tone === "error" ? "error" : ""}`} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}

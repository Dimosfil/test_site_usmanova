type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, children, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "left" ? "align-left" : ""}`.trim()}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

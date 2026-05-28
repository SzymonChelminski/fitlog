export function SectionLabel({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
        {eyebrow}
      </p>
      <h2 className="text-xl font-medium text-custom-text-main">{title}</h2>
    </div>
  );
}

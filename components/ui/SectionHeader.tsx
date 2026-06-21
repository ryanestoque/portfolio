interface SectionHeaderProps {
  /** The section number, e.g. "01", "02" */
  number: string;
  /** The section label, e.g. "PHILOSOPHY", "ARSENAL" */
  label: string;
}

/**
 * Reusable section label strip used across portfolio sections.
 *
 * Renders the `number — line — LABEL` pattern that appears at the
 * top of About, Skills, Experience, and Projects sections.
 */
export default function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">
        {number}
      </span>
      <div className="w-12 h-[1px] bg-accent/75" />
      <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">
        {label}
      </span>
    </div>
  );
}

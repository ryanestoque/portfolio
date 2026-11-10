interface SectionHeaderProps {
  /** The section Roman numeral, e.g. "I", "II" */
  number: string;
  /** The section label, e.g. "BLUEPRINT", "TOOLBOX" */
  label: string;
}

/**
 * Reusable section label strip used across portfolio sections.
 *
 * Renders the `[NUMERAL] — [LABEL]` pattern that appears at the
 * top of About, Skills, Experience, and Projects sections.
 */
export default function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <div className="text-xs tracking-[0.3em] uppercase text-text-secondary">
      {number} — {label}
    </div>
  );
}

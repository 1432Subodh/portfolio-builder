import { Reveal } from "@/components/motion/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <p
        id={id}
        className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-mute"
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-ink sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-lg leading-relaxed text-ink-mute">
          {description}
        </p>
      )}
    </Reveal>
  );
}
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
        className="text-[12px] font-semibold uppercase tracking-[0.18em] text-indigo-300"
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-lg leading-relaxed text-white/55">
          {description}
        </p>
      )}
    </Reveal>
  );
}
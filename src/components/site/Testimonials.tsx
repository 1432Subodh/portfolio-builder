import SectionHeading from "./SectionHeading";
import TestimonialWall from "./TestimonialWall";
import { TESTIMONIALS } from "./testimonials/data";

type Props = {
  limit?: number;
  gap?: number;
};

export default function Testimonials({ limit = 15, gap = 5 }: Props) {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden  py-14 sm:py-16 border-b "
      style={{ paddingBottom: 10 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(62,207,142,0.08),transparent_70%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.06),transparent_65%)] blur-2xl"
      />

      <div className="relative mb-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Wall of love"
            title={<>The people who got the call</>}
            description="42,000+ builders trust Profilio to put their work — and themselves — in front of the right people."
          />
        </div>
      </div>

      <TestimonialWall items={TESTIMONIALS} limit={limit} gap={gap} />
    </section>
  );
}
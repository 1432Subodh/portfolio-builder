import Image from "next/image";
import type { Testimonial } from "./data";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

export default function TestimonialCard({ name, handle, text }: Testimonial) {
  const avatarUrl = `https://i.pravatar.cc/300?u=${encodeURIComponent(handle)}`;

  return (
    <article className="break-inside-avoid rounded-2xl border border-white/[0.06] bg-[#17171a] p-4 transition-all duration-300 hover:border-white/[0.23] hover:shadow-[0_0_18px_rgba(62,207,142,0.14)] cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="relative size-8 shrink-0">
          <span className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.05]">
            <Image
              src={avatarUrl}
              alt={`Avatar of ${name}`}
              width={32}
              height={32}
              className="size-full object-cover"
            />
          </span>
          <span
            aria-hidden
            className="absolute -left-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-white/[0.12] bg-[#1e1e21] text-white/80 shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
          >
            <XIcon className="size-2.5" />
          </span>
        </div>
        <p className="min-w-0 truncate text-[13px] font-medium text-white/85">{handle}</p>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-white/55">{text}</p>
    </article>
  );
}
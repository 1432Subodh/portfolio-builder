import React from "react";
import { ArrowUpRight } from "lucide-react";

function HeroMinimal() {
  return (
    <section className="relative min-h-[680px] w-full overflow-hidden bg-white text-black">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.03] blur-3xl" />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-black" />
        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-black/40" />
        <div className="absolute bottom-[20%] left-[20%] h-1.5 w-1.5 rounded-full bg-black/30" />
      </div>

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="w-full max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-black" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-black/60">
              Creative Developer
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            I build digital
            <br />
            <span className="text-black/40">experiences that</span>
            <br />
            <span>stand out.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
            I'm a designer and developer focused on creating thoughtful,
            high-performance digital experiences with clean interfaces and
            meaningful interactions.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-5"
            >
              View my work
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              Let's talk
            </a>
          </div>

          {/* Bottom metadata */}
          <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-black/10 pt-6 text-xs uppercase tracking-[0.15em] text-black/40">
            <span>Based in India</span>
            <span>Available for work</span>
            <span>2026</span>
          </div>
        </div>

        {/* Decorative number */}
        <div className="pointer-events-none absolute bottom-10 right-10 hidden text-[180px] font-semibold leading-none tracking-[-0.08em] text-black/[0.025] lg:block">
          01
        </div>
      </div>
    </section>
  );
}

export default HeroMinimal;
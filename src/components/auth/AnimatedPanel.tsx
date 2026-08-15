"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Animated left panel — 3D video + gradient overlays + floating UI    */
/* ------------------------------------------------------------------ */

function GradientOverlay({ mx, my }: { mx: number; my: number }) {
  return (
    <div aria-hidden className="absolute inset-0 z-10 pointer-events-none">
      <motion.div
        animate={{ x: mx * 20 - 10, y: my * 20 - 10 }}
        transition={{ type: "spring", damping: 40, stiffness: 120 }}
        className="absolute -left-20 top-[10%] size-[500px] rounded-full bg-black/[0.12] blur-[140px]"
      />
      <motion.div
        animate={{ x: mx * -15, y: my * -15 }}
        transition={{ type: "spring", damping: 40, stiffness: 100 }}
        className="absolute -right-16 bottom-[8%] size-[400px] rounded-full bg-black/[0.08] blur-[120px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
    </div>
  );
}




/* ------------------------------------------------------------------ */
/* Main export                                                         */
/* ------------------------------------------------------------------ */

export default function AnimatedPanel({ mode }: { mode: "signin" | "signup" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative hidden min-h-svh flex-col overflow-hidden bg-background lg:flex"
    >
      {/* ---- 3D Video Background ---- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1) saturate(1.2)" }}
        >
          <source
            src="/3d-video/Abstract_3D_architectural_animat…_202608151324.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <GradientOverlay mx={mouse.x} my={mouse.y} />

      {/* faint grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_70%)]"
      />

      {/* ---------- top bar ---------- */}
      <div className="relative z-30 flex w-full items-start justify-between p-7">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2"
        >
          <span className="flex size-7 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] backdrop-blur-md">
            <Sparkles className="size-3.5 text-primary" />
          </span>
          <span className="text-[13px] font-medium tracking-tight text-white">
            Folioforge
          </span>
        </motion.span>
      </div>

     
      {/* ---------- bottom content ---------- */}
      <div className="relative z-30 mt-auto p-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-white">
            Build your portfolio with Folioforge
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Create stunning, professional portfolios that showcase your work and
            impress potential clients or employers.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Modern Templates", "Easy Customization", "Fast Deployment"].map(
              (feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur-sm"
                >
                  <Star className="size-3 text-primary" />
                  {feature}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
}

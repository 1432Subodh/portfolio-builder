"use client";

import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/site/Features"));
const Templates = dynamic(() => import("@/components/site/Templates"));
const HowItWorks = dynamic(() => import("@/components/site/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/site/Testimonials"));
const Pricing = dynamic(() => import("@/components/site/Pricing"));
const CTA = dynamic(() => import("@/components/site/CTA"));

export default function BelowFold() {
  return (
    <>
      <Features />
      <Templates />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}
"use client";

import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/site/Features"));
const Templates = dynamic(() => import("@/components/site/Templates"));
const Solutions = dynamic(() => import("@/components/site/Solutions"));
const Testimonials = dynamic(() => import("@/components/site/Testimonials"));
const Pricing = dynamic(() => import("@/components/site/Pricing"));

export default function BelowFold() {
  return (
    <>
      <Features />
      <Templates />
      <Solutions />
      <Testimonials />
      <Pricing />
    </>
  );
}
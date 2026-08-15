import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import BelowFold from "@/components/site/BelowFold";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />

      {/* Below-the-fold sections are code-split and lazy loaded on the client */}
      <BelowFold />

      <Footer />
    </main>
  );
}
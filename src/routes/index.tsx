import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutGroup } from "framer-motion";
import { LoaderProvider } from "@/components/portfolio/loader-context";
import { Loader } from "@/components/portfolio/Loader";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { IntroStrip } from "@/components/portfolio/IntroStrip";
import { About } from "@/components/portfolio/About";
import { Stats } from "@/components/portfolio/Stats";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { FeaturedBuild } from "@/components/portfolio/FeaturedBuild";
import { Marquee } from "@/components/portfolio/Marquee";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

function SectionTone({ tone, children }: { tone?: 1 | 2; children: ReactNode }) {
  const cls = tone === 1 ? "section-tone-1" : tone === 2 ? "section-tone-2" : "";
  if (!cls) return <>{children}</>;
  return <div className={cls}>{children}</div>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mihir Prajapati — Civil Estimator | Ontario, CA" },
      {
        name: "description",
        content:
          "Portfolio of Mihir Prajapati — Civil Estimator, Quantity Surveyor & Project Coordinator. Structural steel estimation, CISC/AISC compliance, multi-million-dollar project delivery across Canada, Australia, and India.",
      },
      { property: "og:title", content: "Mihir Prajapati — Civil Estimator | Ontario, CA" },
      {
        property: "og:description",
        content:
          "Civil Estimator & Quantity Surveyor based in Ontario. Structural steel estimation, multi-million-dollar project coordination.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LoaderProvider>
      <LayoutGroup>
        <SmoothScroll />
        <ScrollProgress />
        <main className="relative bg-background text-foreground">
          <div className="noise" />
          <Loader />
          <Nav />
          <Hero />
          <IntroStrip />
          <SectionTone tone={1}>
            <About />
          </SectionTone>
          <Stats />
          <SectionTone tone={2}>
            <Experience />
          </SectionTone>
          <Projects />
          <SectionTone tone={1}>
            <FeaturedBuild />
          </SectionTone>
          <Marquee />
          <SectionTone tone={2}>
            <Skills />
          </SectionTone>
          <Education />
          <SectionTone tone={1}>
            <Contact />
          </SectionTone>
          <Footer />
        </main>
      </LayoutGroup>
    </LoaderProvider>
  );
}

import ParticleFieldWrapper from "@/components/ParticleFieldWrapper";
import FloatingElements from "@/components/FloatingElements";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import RobotCompanionWrapper from "@/components/RobotCompanionWrapper";

export default function Home() {
  return (
    <>
      <ParticleFieldWrapper />
      <FloatingElements />
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <RobotCompanionWrapper />
    </>
  );
}

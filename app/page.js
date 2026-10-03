import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Education } from './components/sections/Education';
import { PortfolioChat } from './components/chat/PortfolioChat';
import { Skills } from './components/sections/Skills';
import { Tools } from './components/sections/Tools';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { AmbientGlow } from './components/motion/AmbientGlow';
import { PortfolioIntro } from './components/motion/PortfolioIntro';

export default function Page() {
  return (
    <PortfolioIntro>
      <div className="relative isolate min-h-screen bg-background text-foreground">
        {/* Keep one continuous glow behind every section as the page scrolls. */}
        <AmbientGlow className="fixed -z-10" />
        <ScrollProgress />
        <Navbar />
        <main className="relative min-h-screen overflow-x-clip pt-24">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Tools />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <PortfolioChat />
      </div>
    </PortfolioIntro>
  );
}

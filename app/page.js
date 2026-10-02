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

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative min-h-screen overflow-x-clip bg-background pt-24 text-foreground">
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
    </>
  );
}

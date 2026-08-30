import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Tools } from './components/sections/Tools';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Tools />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

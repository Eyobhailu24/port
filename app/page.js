import { FaHome } from 'react-icons/fa';
import { FloatingNav } from './components/FloatingNav';
import Home from './components/Home';
import AboutGrid from './components/AboutGrid';
import ProjectsGrid from './components/ProjectsGrid';
import ContactGrid from './components/ContactGrid';
import Footer from './components/Footer';

export default function Page() {
  return (
    <main
      className="relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden mx-auto sm:px-10 px-5"
    >
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={[
            { name: 'Home', href: '#Home', icon: <FaHome /> },
          ]}
        />
        <Home />
        <AboutGrid />
        <ProjectsGrid />
        <ContactGrid />
        <Footer />
      </div>
    </main>
  );
}

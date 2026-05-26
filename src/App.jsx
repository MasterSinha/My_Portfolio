import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminApp from './admin/AdminApp';

import Navbar        from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor  from './components/CustomCursor';
import Footer        from './components/Footer';

import Hero         from './components/sections/Hero';
import About        from './components/sections/About';
import Skills       from './components/sections/Skills';
import Projects     from './components/sections/Projects';
import Experience   from './components/sections/Experience';
import TechStack    from './components/sections/TechStack';
import Achievements from './components/sections/Achievements';
import Contact      from './components/sections/Contact';

function Portfolio() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="noise-overlay" />
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CustomCursor />
      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <TechStack />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*"       element={<Portfolio />} />
    </Routes>
  );
}

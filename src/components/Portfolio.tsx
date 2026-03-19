import { useState, useEffect, lazy, Suspense } from 'react';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import Footer from './Footer';

const About = lazy(() => import('./About'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));
const Chatbot = lazy(() => import('./Chatbot'));

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen py-20 flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <About />
            <Projects />
            <Contact />
            <Chatbot />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
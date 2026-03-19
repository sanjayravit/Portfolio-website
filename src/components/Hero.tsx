import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, DownloadSimple, Handshake } from 'phosphor-react';
import Spline from '@splinetool/react-spline';
import ErrorBoundary from './ErrorBoundary';
import { Button } from './ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const orbRef3 = useRef<HTMLDivElement>(null);

  const [shouldLoadRobot, setShouldLoadRobot] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for low-end device
    const checkLowEnd = () => {
      // Only fallback on devices with very low hardware concurrency (under 4 cores)
      // Most modern mobiles can handle the Spline scene fine.
      const lowConcurrency = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      if (lowConcurrency) {
        setIsLowEndDevice(true);
      }
    };
    checkLowEnd();

    // Intersection Observer to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    const tl = gsap.timeline({ delay: 4 });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .from(splineRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(orbRef1.current, {
        y: -20,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(orbRef2.current, {
        y: -30,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });

      gsap.to(orbRef3.current, {
        y: -25,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2
      });
    });

    const timer = setTimeout(() => {
      setShouldLoadRobot(true);
    }, 1000);

    return () => {
      observer.disconnect();
      tl.kill();
      mm.revert();
      clearTimeout(timer);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '';
    link.download = 'Sanjay-Ravi-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={splineRef} className="absolute inset-0 w-full h-full opacity-70 overflow-hidden" style={{ pointerEvents: 'none', willChange: 'opacity, transform' }}>
        <ErrorBoundary fallback={<div className="w-full h-full opacity-50 bg-gradient-to-b from-primary/10 to-background/20" />}>
          {shouldLoadRobot && (
            isLowEndDevice ? (
              <div className="w-full h-full flex items-center justify-center">
                {/* Premium static fallback */}
                <img src="/robot-fallback.webp" alt="3D Robot" className="animate-pulse float object-contain max-w-sm opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            ) : (
              <div
                className="spline-wrapper w-full h-full"
                style={{ visibility: (!isLoaded || isInView) ? 'visible' : 'hidden' }}
              >
                <Spline
                  scene="/scene.splinecode"
                  className="w-full h-full animate-in fade-in duration-1000"
                  onLoad={(spline) => {
                    setIsLoaded(true);
                    try {
                      const isMobile = window.matchMedia("(max-width: 768px)").matches;
                      const ratio = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
                      if (typeof (spline as any).setPixelRatio === 'function') {
                        (spline as any).setPixelRatio(ratio);
                      } else if ((spline as any)._renderer && typeof (spline as any)._renderer.setPixelRatio === 'function') {
                        (spline as any)._renderer.setPixelRatio(ratio);
                      }
                    } catch (err) {
                      console.error('Error setting pixel ratio for Spline:', err);
                    }
                  }}
                />
              </div>
            )
          )}
        </ErrorBoundary>
        <div className="absolute bottom-0 right-0 w-40 h-16 bg-gradient-to-tl from-background via-background to-transparent pointer-events-none z-10" />
      </div>

      <div ref={orbRef1} className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl md:animate-pulse opacity-50 md:opacity-100" style={{ pointerEvents: 'none', willChange: 'transform' }} />
      <div ref={orbRef2} className="absolute top-1/3 right-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-xl md:animate-pulse opacity-50 md:opacity-100" style={{ animationDelay: '1s', pointerEvents: 'none', willChange: 'transform' }} />
      <div ref={orbRef3} className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent/20 rounded-full blur-xl md:animate-pulse opacity-50 md:opacity-100" style={{ animationDelay: '2s', pointerEvents: 'none', willChange: 'transform' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
          Hi, I'm{' '}
          <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
            Sanjay Ravi
          </span>
          {' '}–{' '}
          <br className="hidden md:block" />
          <span className="text-primary-glow">web developer</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Website Developer craft immersive animated websites that move, engage, and inspire - turning static pages into dynamic digital experiences
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={scrollToContact} className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105" size="lg">
            <Handshake size={20} />
            Hire Me
          </Button>

          <Button onClick={downloadCV} variant="outline" className="group inline-flex items-center gap-3 px-8 py-4 border-primary/30 text-primary hover:bg-primary/10 rounded-lg font-medium transition-all duration-300 hover:scale-105" size="lg">
            <DownloadSimple size={20} />
            Download CV
          </Button>

          <Button onClick={scrollToProjects} variant="ghost" className="group inline-flex items-center gap-3 px-8 py-4 text-foreground hover:bg-primary/10 rounded-lg font-medium transition-all duration-300 hover:scale-105" size="lg">
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, DownloadSimple, Handshake } from 'phosphor-react';
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

  useEffect(() => {
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

    return () => {
      tl.kill();
      mm.revert();
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
        <iframe src="https://my.spline.design/genkubgreetingrobot-MW4W3iAFsJj5olFfT1MhN0TH/" frameBorder="0" width="100%" height="100%" className="w-full h-full" style={{ pointerEvents: 'none' }} title="Hero Robot" loading="lazy" />
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
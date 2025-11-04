import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import gaberLogo from '@/assets/gaber-logo-color.svg';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.from(headerRef.current, {
        y: -20,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      });
    },
    { scope: headerRef }
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 lg:px-16 border-b border-white/20 overflow-hidden"
    >
      <div 
        className="absolute inset-0 -z-10 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.7) 80%, rgba(255, 255, 255, 0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
        }}
      />
      <div 
        className="absolute inset-0 -z-10 bg-white/25"
      />
      <nav className="flex items-center justify-between">
        <img 
          src={gaberLogo} 
          alt="Gaber" 
          className="h-8 w-auto cursor-pointer md:h-10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={() => scrollToSection('our-vision')}
            className="text-base font-medium tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
          >
            Our Vision
          </button>
          <button
            onClick={() => scrollToSection('subscription-form')}
            className="rounded-full border border-primary bg-primary/10 px-4 py-2 md:px-6 md:py-2.5 text-base font-medium tracking-tight text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary"
          >
            Join
          </button>
        </div>
      </nav>
    </header>
  );
}

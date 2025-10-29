import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gaberLogo from '@/assets/gaber-logo.svg';

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const showHeader = () => {
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const hideHeader = () => {
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: -100,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        showHeader();
      } else if (currentScrollY > lastScrollY) {
        hideHeader();
      } else {
        showHeader();
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-10 lg:px-16"
    >
      <nav className="flex items-center justify-between">
        <img 
          src={gaberLogo} 
          alt="Gaber" 
          className="h-11 w-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('our-vision')}
            className="text-sm font-light tracking-tight text-white/90 transition-colors duration-300 hover:text-white"
          >
            Our Vision
          </button>
          <button
            onClick={() => scrollToSection('subscription-form')}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30"
          >
            Join
          </button>
        </div>
      </nav>
    </header>
  );
}

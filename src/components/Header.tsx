import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import gaberLogo from '@/assets/gaber-logo.svg';

gsap.registerPlugin(useGSAP);

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
        clearProps: 'all'
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
      className="fixed top-0 left-0 right-0 z-[100] bg-background/20 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-10 lg:px-16"
    >
      <nav className="flex items-center justify-between">
        <img 
          src={gaberLogo} 
          alt="Gaber" 
          className="h-[60px] w-auto cursor-pointer"
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

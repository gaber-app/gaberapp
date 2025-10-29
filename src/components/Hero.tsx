import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Button } from '@/components/ui/button';
import gaberLogo from '@/assets/gaber-logo.svg';

gsap.registerPlugin(SplitText, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: 'lines',
          linesClass: 'overflow-hidden',
        });

        const lines = split.lines;

        gsap.set(lines, {
          yPercent: 100,
          autoAlpha: 0,
        });

        if (logoRef.current) {
          gsap.set(logoRef.current, { autoAlpha: 0, y: -20 });
        }
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 20 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        if (logoRef.current) {
          tl.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.3);
        }

        tl.to(
          lines,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.15,
          },
          0.5,
        );

        if (paraRef.current) {
          tl.to(paraRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.4');
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.5');
        }
      });
    },
    { scope: sectionRef },
  );

  const scrollToForm = () => {
    const formElement = document.getElementById('subscription-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center md:px-10 lg:px-16">
        <img 
          ref={logoRef}
          src={gaberLogo} 
          alt="Gaber" 
          className="mx-auto mb-12 h-14 w-auto md:h-16"
        />

        <h1 
          ref={headerRef} 
          className="mb-8 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl md:whitespace-nowrap lg:text-7xl"
        >
          Connect. Collaborate. Thrive.
        </h1>

        <p 
          ref={paraRef} 
          className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed tracking-tight text-white sm:text-xl"
        >
          The premier professional networking platform uniting Armenian diaspora worldwide. 
          Building bridges, creating opportunities, strengthening our global community.
        </p>

        <div ref={ctaRef}>
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="group relative overflow-hidden bg-white px-8 py-6 text-base font-semibold text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary-glow)_/_0.6)]"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-glow">Join the Waitlist</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </div>
      </div>
    </section>
  );
}

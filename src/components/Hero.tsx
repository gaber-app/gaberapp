import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(SplitText, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
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

        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 20 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

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

        <div className="mt-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
              See It In Action
            </h2>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-background/20 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/70">Demo video coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

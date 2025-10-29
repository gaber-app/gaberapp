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
  useGSAP(() => {
    if (!headerRef.current) return;
    document.fonts.ready.then(() => {
      const split = new SplitText(headerRef.current!, {
        type: 'lines',
        linesClass: 'overflow-hidden'
      });
      const lines = split.lines;
      gsap.set(lines, {
        yPercent: 100,
        autoAlpha: 0
      });
      if (paraRef.current) {
        gsap.set(paraRef.current, {
          autoAlpha: 0,
          y: 20
        });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, {
          autoAlpha: 0,
          y: 20
        });
      }
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });
      tl.to(lines, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.15
      }, 0.5);
      if (paraRef.current) {
        tl.to(paraRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8
        }, '-=0.4');
      }
      if (ctaRef.current) {
        tl.to(ctaRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8
        }, '-=0.5');
      }
    });
  }, {
    scope: sectionRef
  });
  const scrollToForm = () => {
    const formElement = document.getElementById('subscription-form');
    formElement?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full px-6 py-32 md:px-10 lg:px-16 md:py-40">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-left space-y-8">
            <h1 ref={headerRef} className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Connect. Collaborate. Thrive.
            </h1>

            <p ref={paraRef} className="text-base font-medium leading-relaxed tracking-tight text-foreground sm:text-lg md:text-xl backdrop-blur-md bg-white/30 p-6 rounded-lg">
              The premier professional networking platform uniting Armenian diaspora worldwide. 
              Building bridges, creating opportunities, strengthening our global community.
            </p>

            <div ref={ctaRef}>
              <Button onClick={scrollToForm} size="lg" className="group relative overflow-hidden bg-primary px-8 py-6 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary-glow)_/_0.6)]">
                <span className="relative z-10">Join the Waitlist</span>
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="flex-shrink-0">
            
          </div>
        </div>
      </div>
    </section>;
}
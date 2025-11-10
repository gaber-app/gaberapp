import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';
import { trackConversion } from '@/lib/analytics';
import animationData from '@/assets/showreel-animation.json';
gsap.registerPlugin(SplitText, useGSAP);
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<HTMLDivElement | null>(null);
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

      if (lottieRef.current) {
        gsap.set(lottieRef.current, {
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

      if (lottieRef.current) {
        tl.to(lottieRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8
        }, '-=0.6');
      }
    });
  }, {
    scope: sectionRef
  });
  const scrollToForm = () => {
    trackConversion.buttonClick('Join the Waitlist', 'Hero Section');
    const formElement = document.getElementById('subscription-form');
    formElement?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 px-4 md:px-6 lg:px-16">
      <div className="relative w-full py-32 md:py-40">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-left space-y-8">
            <h1 ref={headerRef} className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Armenian roots. <br className="hidden md:block" /><span className="md:whitespace-nowrap">Modern connections.</span>
            </h1>

            <div className="max-w-2xl">
              <p ref={paraRef} className="text-lg font-medium leading-relaxed tracking-tight text-foreground sm:text-lg md:text-xl">The premier professional networking platform uniting the Armenian diaspora. Building bridges, creating opportunities, strengthening our community.</p>
            </div>

            <div ref={ctaRef}>
              <Button onClick={scrollToForm} size="lg" className="group relative overflow-hidden bg-primary px-8 py-6 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary-glow)_/_0.6)]">
                <span className="relative z-10">Join the Waitlist</span>
              </Button>
            </div>
          </div>

            {/* Animation Section */}
            <div ref={lottieRef} className="flex-shrink-0 w-full lg:w-auto lg:max-w-xl">
              <Lottie 
                animationData={animationData}
                loop={true}
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
}
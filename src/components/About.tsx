import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const manifestoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !manifestoRef.current) return;

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(manifestoRef.current, {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 80%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section 
      id="our-vision"
      ref={sectionRef} 
      className="relative pt-16 pb-32 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-6xl">
        <h2 
          ref={headingRef}
          className="mb-12 text-left text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Our Vision
        </h2>

        <div 
          ref={manifestoRef}
          className="max-w-2xl text-left"
        >
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            In Armenian, "Gaber" means "ties" or "connections". It's a name that embodies our core mission: to build the largest US-based (for now) professional network for Armenians. This isn't just another platform; it's a movement to create a vibrant, inclusive community where every Armenian professional feels a sense of belonging and has the opportunity to thrive.
          </p>
        </div>
      </div>
    </section>
  );
}

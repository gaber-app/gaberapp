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
      className="relative py-32 px-6 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2 
          ref={headingRef}
          className="mb-12 text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Our Vision
        </h2>

        <div 
          ref={manifestoRef}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-lg font-light leading-relaxed text-white sm:text-xl">
            We're building more than a network—we're creating a movement. A space where Armenian 
            professionals worldwide can connect authentically, share knowledge freely, and collaborate 
            meaningfully.
          </p>
          <p className="text-lg font-light leading-relaxed text-white sm:text-xl">
            From entrepreneurs to executives, artists to engineers, Gaber brings together the brightest 
            minds in our diaspora, fostering innovation and opportunity across borders.
          </p>
        </div>
      </div>
    </section>
  );
}

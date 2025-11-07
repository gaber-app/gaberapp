import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const manifestoRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!headingRef.current || !manifestoRef.current) return;
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%'
      },
      y: 40,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out'
    });
    gsap.from(manifestoRef.current, {
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: 'top 80%'
      },
      y: 40,
      autoAlpha: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }, {
    scope: sectionRef
  });
  return <section id="our-vision" ref={sectionRef} className="relative pt-24 pb-24 px-4 md:px-6 lg:px-16">
      <div className="max-w-6xl w-full mx-auto">
        <h2 ref={headingRef} className="mb-12 text-left text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Our Vision
        </h2>

        <div ref={manifestoRef} className="max-w-2xl text-left">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            Gaber aims to be a vibrant, inclusive community where every Armenian professional can connect, feel a sense of belonging, and have the opportunity to thrive. It connects people from all backgrounds—recent graduates, executives, entrepreneurs, etc.—regardless of their profession or location. Ready to be part of this community? <button onClick={() => document.getElementById('subscription-form')?.scrollIntoView({ behavior: 'smooth' })} className="text-primary hover:underline font-semibold">Join the waitlist</button> today.
          </p>
        </div>
      </div>
    </section>;
}
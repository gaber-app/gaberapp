import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function WhatIsGaber() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!headingRef.current || !contentRef.current) return;
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
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
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
  return <section id="what-is-gaber" ref={sectionRef} className="relative pt-0 pb-32 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl">
        <h2 ref={headingRef} className="mb-12 text-left text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What is Gaber?
        </h2>

        <div ref={contentRef} className="max-w-2xl text-left space-y-6">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">Gaber (Կապէր) is the premier professional networking app designed exclusively for the 🇺🇸 based Armenian diaspora. Our mission is to strengthen the Armenian community in the United States by providing a dedicated digital space for professional connection.</p>
          
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            The Gaber mobile application goes beyond simple networking to facilitate:
          </p>

          <ul className="space-y-4 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            <li>
              <strong>Purposeful Connections:</strong> Helping users find meaningful mentorships, collaborations, and career opportunities.
            </li>
            <li>
              <strong>Inclusivity and Unity:</strong> Providing a safe, judgment-free platform for all who identify as Armenian, bridging divides and fostering mutual respect.
            </li>
            <li>
              <strong>Empowerment:</strong> Creating a space for users to share knowledge, celebrate successes, and offer support to uplift one another and build a stronger community.
            </li>
          </ul>

          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            In short, the Gaber app is a tool that harnesses the collective talent and shared culture of Armenians to build a more prosperous future.
          </p>
        </div>
      </div>
    </section>;
}
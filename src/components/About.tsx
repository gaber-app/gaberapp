import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    title: "Global Network",
    description: "Connect with Armenian professionals across continents, industries, and expertise levels."
  },
  {
    title: "Career Growth",
    description: "Discover opportunities, mentorship, and partnerships that propel your professional journey."
  },
  {
    title: "Cultural Unity",
    description: "Celebrate our heritage while building a modern, dynamic professional community."
  },
  {
    title: "Strategic Collaboration",
    description: "Form meaningful partnerships that drive innovation and create lasting impact."
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const manifestoRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !manifestoRef.current || !featuresRef.current) return;

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

      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section 
      id="our-vision"
      ref={sectionRef} 
      className="relative pt-32 pb-16 px-6 md:px-10 lg:px-16"
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
          className="mx-auto mb-24 max-w-3xl text-center"
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

        <div 
          ref={featuresRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
              <h3 className="mb-4 text-xl font-medium tracking-tight text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

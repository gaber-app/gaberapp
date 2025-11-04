import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Sparkles } from 'lucide-react';

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
      <div className="max-w-6xl w-full">
        <h2 
          ref={headingRef}
          className="mb-12 text-left text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Our Vision
        </h2>

        <div 
          ref={manifestoRef}
          className="max-w-2xl text-left mb-16"
        >
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            The Gaber app aims to be a vibrant, inclusive community where every Armenian professional can connect, feel a sense of belonging, and have the opportunity to thrive. It connects people from all backgrounds—recent graduates, executives, creative entrepreneurs, etc.—regardless of their career path or location.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">Purposeful Connections</h3>
              <p className="text-sm text-muted-foreground">
                Connect with professionals who share your background and ambitions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Heart className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">Inclusivity and Unity</h3>
              <p className="text-sm text-muted-foreground">
                A welcoming space for all Armenians, regardless of career stage or location.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Sparkles className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">Empowerment</h3>
              <p className="text-sm text-muted-foreground">
                Tools and resources to help you grow personally and professionally.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

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
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl mb-8">
            The Gaber app aims to be a vibrant, inclusive community where every Armenian professional can connect, feel a sense of belonging, and have the opportunity to thrive. It connects people from all backgrounds—recent graduates, executives, creative entrepreneurs, etc.—regardless of their career path or location.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 max-w-full">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Purposeful Connections</h3>
                    <p className="text-muted-foreground">Helping users find meaningful mentorships, collaborations, and career opportunities.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Inclusivity and Unity</h3>
                    <p className="text-muted-foreground">Providing a safe, judgment-free platform for all who identify as Armenian, bridging divides and fostering mutual respect.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Empowerment</h3>
                    <p className="text-muted-foreground">Creating a space for users to share knowledge, celebrate successes, and offer support to uplift one another and build a stronger community.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Sparkles } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function WhatIsGaber() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  
  useGSAP(() => {
    if (!headingRef.current || !contentRef.current || !cardsRef.current) return;
    
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
    
    gsap.from(cardsRef.current.children, {
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%'
      },
      y: 40,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.15,
      delay: 0.4,
      ease: 'power3.out'
    });
  }, {
    scope: sectionRef
  });
  return <section id="what-is-gaber" ref={sectionRef} className="relative pt-24 pb-24 px-4 md:px-6 lg:px-16">
      <div className="max-w-6xl w-full mx-auto">
        <h2 ref={headingRef} className="mb-12 text-left text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What is Gaber?
        </h2>

        <div ref={contentRef} className="max-w-2xl text-left mb-16">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            Gaber (Կապեր) is the premier professional networking app designed exclusively for the US-based Armenian diaspora. Our mission is to strengthen the Armenian community in the United States by providing a dedicated digital space for professional connection. Learn more about <button onClick={() => document.getElementById('our-vision')?.scrollIntoView({ behavior: 'smooth' })} className="text-primary hover:underline font-semibold">our vision</button> for the future.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
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
              <h3 className="mb-2 text-xl font-semibold text-foreground">Inclusivity & Unity</h3>
              <p className="text-sm text-muted-foreground">A welcoming and safe space for all Armenians, regardless of career stage.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Sparkles className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">Empowerment</h3>
              <p className="text-sm text-muted-foreground">Network and connections to help you grow personally and professionally.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
}
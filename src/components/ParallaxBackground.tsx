import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import morphBg from '@/assets/morph-lines-bg.svg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: '20%',
      ease: 'none',
    });
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url(${morphBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateY(-10%)',
        }}
      />
    </div>
  );
}

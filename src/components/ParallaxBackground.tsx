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

    gsap.fromTo(bgRef.current, 
      { y: '-50%' },
      {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: '50%',
        ease: 'none',
      }
    );
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <div
        ref={bgRef}
        className="absolute w-full opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url(${morphBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          top: '-50%',
          bottom: '-50%',
          height: '200%',
        }}
      />
    </div>
  );
}

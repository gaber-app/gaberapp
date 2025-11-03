import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import morphBg from '@/assets/morph-lines-bg.svg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null);


  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
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

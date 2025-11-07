import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDarkener() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (overlayRef.current) {
          // Gradually increase darkness with dark blue overlay as user scrolls
          const darkness = self.progress * 0.7; // Max 70% darkness
          overlayRef.current.style.backgroundColor = `rgba(15, 17, 31, ${darkness})`; // Dark blue instead of black
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-0 transition-colors duration-300"
      aria-hidden="true"
    />
  );
}

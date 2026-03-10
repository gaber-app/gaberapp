import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParallaxBackground from '@/components/ParallaxBackground';

export default function OurStory() {
  useEffect(() => {
    document.title = 'Our Story — Gaber | Connecting Armenian Professionals';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Discover how Gaber started — a mission to connect Armenian professionals worldwide and build a thriving community.'
      );
    }
    window.scrollTo(0, 0);

    // Structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Our Story — Gaber',
      description:
        'Discover how Gaber started — a mission to connect Armenian professionals worldwide.',
      url: 'https://gaberapp.com/our-story',
      publisher: {
        '@type': 'Organization',
        name: 'Gaber',
        url: 'https://gaberapp.com',
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title = 'Gaber — Connecting Armenian Professionals';
      const origMeta = document.querySelector('meta[name="description"]');
      if (origMeta) {
        origMeta.setAttribute(
          'content',
          'Gaber connects Armenian professionals worldwide. Join the waitlist today.'
        );
      }
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full">
      <ParallaxBackground />
      <Header />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 lg:pb-24 px-4 md:px-6 lg:px-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-8">
            Our Story
          </h1>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <p>
              {/* Replace with your actual story content */}
              Every great community begins with a simple question. Ours was:
              <em> "Why isn't there a dedicated space for Armenian professionals to connect?"</em>
            </p>

            <p>
              Despite a global diaspora of millions, Armenian professionals lacked a
              purpose-built platform to find each other, share opportunities, and
              grow together. LinkedIn was too broad. Facebook groups were too
              scattered. Nothing felt like <em>home</em>.
            </p>

            <p>
              That's why we started building Gaber — a place where Armenian
              professionals from every industry, every generation, and every corner
              of the world can come together with a shared sense of belonging.
            </p>

            <p>
              We believe that when talented people connect around shared identity
              and purpose, extraordinary things happen — partnerships form, careers
              accelerate, and communities thrive.
            </p>

            <p className="font-medium text-foreground">
              This is just the beginning.{' '}
              <a
                href="/#subscription-form"
                className="text-primary hover:underline font-semibold"
              >
                Join the waitlist
              </a>{' '}
              and be part of what comes next.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParallaxBackground from '@/components/ParallaxBackground';
import googleSearchImage from '@/assets/google-search-yerevan.jpeg';

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
        url: 'https://gaberapp.com'
      }
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
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full">
      <ParallaxBackground opacity={8} />
      <Header />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 lg:pb-24 px-4 md:px-6 lg:px-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-8">
            Our Story
          </h1>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <p className="font-medium">I returned home from In Vino one night, suddenly angry at the state of my being. It was late, and I was exhausted from walking all day in the late September heat that "strangely" engulfed Yerevan at that time of year. But what did I know about weather patterns in Yerevan? It was my first time back in Armenia after fourteen years.

</p>

            <p className="font-medium">Immediately upon entering the apartment, I heard the likes of Whitney Houston coming from beyond my dining room table. I opened the door to the balcony and, lo and behold, yet another Armenian with an outrageous set of chops. Somewhere in the distance, they were belting out the most perfect rendition of "I Wanna Dance With Somebody" I had ever heard. This theme followed me throughout my trip.



            </p>

            <blockquote className="my-10 border-l-4 border-primary px-6 py-4 bg-primary/5 rounded-r-lg">
              <p className="text-xl sm:text-2xl italic text-foreground font-light">
                "Armenia is a country with a surplus of talent."
              </p>
            </blockquote>


            <p className="font-medium">
              I thought to myself, <em>"Why am I the only one without a single talent to contribute to greater Armenian society?"</em> That was an exaggeration, of course, but it sure did feel like it.
            </p>

            <p className="font-medium">I closed the balcony door, grabbed my laptop, and plopped myself onto the eight-foot-long leather sofa in the living room of my four-story walk-up. I flipped up the screen, and performed the following Google search… "how do i contribute to armenian society when i have no talent".</p>

            <figure className="my-8">
              <img alt="Google search: how do I contribute to Armenian society when I have no talent" className="w-full rounded-lg shadow-lg object-cover border-accent border-double"
              loading="lazy" src="/lovable-uploads/4f136149-ff3e-4083-a056-442313875197.png" />
              
              <figcaption className="mt-3 text-sm text-muted-foreground italic text-center">
                The Google search that started it all — taken from my seat on the sofa in Yerevan.
              </figcaption>
            </figure>

            <p className="font-medium">
              Most of the search results were philanthropic in nature, telling me to "donate" or "volunteer." Both of which are noble things to do, and I strongly encourage everyone to do so as much and as often as they can.
            </p>

            <p className="font-medium">
              This uncertainty weighed on me for months.
            </p>

            <p className="font-medium">
              After some time (and due to my own personal circumstances and vested interests), I decided that what we really need as a society is an Armenian dating app. Yes, another one - but one that was inclusive of all Armenians, regardless of gender or sexuality.
            </p>

            <p className="font-medium">
              I won't get into why that never came to be, but it did serve as the catalyst for me to do something else.

            </p>

            <p className="font-medium">
              Back home in January, I had coffee with someone who was introduced to me by a complete stranger on LinkedIn. He was Armenian, which is why I was open to meeting him in the first place. He was networking, as he had just moved from Armenia to the DC area looking for work.

            </p>

            <p className="font-medium">
              This was one of many recurring experiences I had with Armenians that led me to build Gaber.
            </p>

            <blockquote className="my-10 border-l-4 border-primary px-6 py-4 bg-primary/5 rounded-r-lg">
              <p className="text-xl sm:text-2xl italic text-foreground font-light">
                "Armenians in the States deserve a professional, inclusive, digital space, rooted in shared identity that erases the geographical borders which have long defined our communities."
              </p>
            </blockquote>

            <p className="font-medium">
              In Armenian, Gaber translates to "connections" or "ties." The singular form of the word surfaced so frequently in conversations, both with my mother and friends in Armenia, that pluralizing wasn't just a choice, but an obvious fit.
            </p>

            <p className="font-medium">
              The name, the app, and everything that comes with it is a nod to the Armenians, communities, and organizations who made me who I am today. I am a product of the Washington, D.C. Armenian-American community, of Hamasdegh Armenian School, of my grandparents Vartan and Sosi, of my mother Ankine, my sister Talar, and my best friend Arpa.
            </p>

            <p className="font-medium">
              Gaber is my way of paying these connections and influences forward. My team and I have built this for our community, and I can't wait to see what ties of your own you create here.
            </p>

            <blockquote className="my-10 border-l-4 border-primary px-6 py-4 bg-primary/5 rounded-r-lg">
              <p className="text-xl sm:text-2xl italic text-foreground font-light">
                "We are only as strong as the ties that bind us."
              </p>
            </blockquote>

            <p className="font-medium text-foreground">
              I hope your ties are as enduring as the ones that brought me here.
            </p>

            <div className="mt-14 pt-8 border-t border-border flex items-center gap-4">
              <div>
                <p className="text-lg font-semibold text-foreground">Tevin Polatian</p>
                <p className="text-sm text-muted-foreground">Founder</p>
                <a href="https://www.linkedin.com/in/tevinpolatian/" target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  
                  Connect on LinkedIn (for now)
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>);

}
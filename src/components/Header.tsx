import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gaberLogo from '@/assets/gaber-logo-color.svg';
import { trackConversion } from '@/lib/analytics';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useGSAP(
    () => {
      if (!headerRef.current) return;
      gsap.from(headerRef.current, {
        y: -20,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      });
    },
    { scope: headerRef }
  );

  const handleSectionLink = (id: string) => {
    trackConversion.navigationClick(id);
    if (isHome) {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 lg:px-16 border-b border-white/20 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 backdrop-blur-xl"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.7) 80%, rgba(255, 255, 255, 0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/25" />
      <nav className="flex items-center justify-between">
        {isHome ? (
          <img
            src={gaberLogo}
            alt="Gaber"
            className="h-8 w-auto cursor-pointer md:h-10"
            onClick={handleLogoClick}
          />
        ) : (
          <Link to="/">
            <img src={gaberLogo} alt="Gaber" className="h-8 w-auto md:h-10" />
          </Link>
        )}

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Navigation */}
          {isHome ? (
            <>
              <button
                onClick={() => handleSectionLink('what-is-gaber')}
                className="hidden md:block text-base font-medium tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
              >
                What is Gaber?
              </button>
              <button
                onClick={() => handleSectionLink('our-vision')}
                className="hidden md:block text-base font-medium tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
              >
                Our Vision
              </button>
            </>
          ) : (
            <>
              <Link
                to="/#what-is-gaber"
                className="hidden md:block text-base font-medium tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
              >
                What is Gaber?
              </Link>
              <Link
                to="/#our-vision"
                className="hidden md:block text-base font-medium tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
              >
                Our Vision
              </Link>
            </>
          )}

          <Link
            to="/our-story"
            className={`hidden md:block text-base font-medium tracking-tight transition-colors duration-300 ${
              location.pathname === '/our-story'
                ? 'text-primary/60'
                : 'text-primary hover:text-primary/80'
            }`}
          >
            Our Story
          </Link>

          {isHome ? (
            <button
              onClick={() => handleSectionLink('subscription-form')}
              className="rounded-full border border-primary bg-primary/10 px-4 py-2 md:px-6 md:py-2.5 text-base font-medium tracking-tight text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary"
            >
              Join
            </button>
          ) : (
            <Link
              to="/#subscription-form"
              className="rounded-full border border-primary bg-primary/10 px-4 py-2 md:px-6 md:py-2.5 text-base font-medium tracking-tight text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary"
            >
              Join
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-primary hover:text-primary/80 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] bg-background/95 backdrop-blur-xl border-border/50 p-4 [&>button]:hidden"
            >
              <SheetHeader className="flex flex-row items-end justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <X className="h-7 w-7" />
                </button>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-8">
                {isHome ? (
                  <>
                    <button
                      onClick={() => handleSectionLink('what-is-gaber')}
                      className="text-left text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/10"
                    >
                      What is Gaber?
                    </button>
                    <button
                      onClick={() => handleSectionLink('our-vision')}
                      className="text-left text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/10"
                    >
                      Our Vision
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/#what-is-gaber"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/10"
                    >
                      What is Gaber?
                    </Link>
                    <Link
                      to="/#our-vision"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/10"
                    >
                      Our Vision
                    </Link>
                  </>
                )}

                <Link
                  to="/our-story"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left text-lg font-medium tracking-tight transition-colors duration-300 py-3 px-4 rounded-lg ${
                    location.pathname === '/our-story'
                      ? 'text-primary/60'
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  Our Story
                </Link>

                {isHome ? (
                  <button
                    onClick={() => handleSectionLink('subscription-form')}
                    className="text-left text-lg font-medium tracking-tight text-primary-foreground transition-colors duration-300 py-3 px-4 rounded-lg bg-primary hover:bg-primary/90"
                  >
                    Join Waitlist
                  </button>
                ) : (
                  <Link
                    to="/#subscription-form"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-left text-lg font-medium tracking-tight text-primary-foreground transition-colors duration-300 py-3 px-4 rounded-lg bg-primary hover:bg-primary/90"
                  >
                    Join Waitlist
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

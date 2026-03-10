import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ParallaxBackground from '@/components/ParallaxBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhatIsGaber from '@/components/WhatIsGaber';
import SubscriptionForm from '@/components/SubscriptionForm';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  return (
    <main className="relative min-h-screen w-full">
      <ParallaxBackground />
      <Header />
      <Hero />
      <WhatIsGaber />
      <About />
      <SubscriptionForm />
      <Footer />
    </main>
  );
};

export default Index;

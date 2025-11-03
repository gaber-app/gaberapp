import ParallaxBackground from '@/components/ParallaxBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SubscriptionForm from '@/components/SubscriptionForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative min-h-screen w-full">
      <ParallaxBackground />
      <Header />
      <Hero />
      <About />
      <SubscriptionForm />
      <Footer />
    </main>
  );
};

export default Index;

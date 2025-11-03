import ShaderBackground from '@/components/ShaderBackground';
import ParallaxBackground from '@/components/ParallaxBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SubscriptionForm from '@/components/SubscriptionForm';

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <ShaderBackground />
      <ParallaxBackground />
      <Header />
      <Hero />
      <About />
      <SubscriptionForm />
    </main>
  );
};

export default Index;

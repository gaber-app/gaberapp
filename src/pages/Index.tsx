import ShaderBackground from '@/components/ShaderBackground';
import ScrollDarkener from '@/components/ScrollDarkener';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SubscriptionForm from '@/components/SubscriptionForm';

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <ShaderBackground />
      <ScrollDarkener />
      <Hero />
      <About />
      <SubscriptionForm />
    </main>
  );
};

export default Index;

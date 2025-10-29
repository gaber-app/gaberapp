import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const formSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Please enter your full name" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
});

export default function SubscriptionForm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useGSAP(
    () => {
      if (!formRef.current) return;

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = formSchema.parse({ fullName, email });
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Welcome to Gaber!",
        description: "You're on the waitlist. We'll be in touch soon.",
      });
      
      setFullName('');
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="subscription-form"
      ref={sectionRef} 
      className="relative py-32 px-6 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-2xl">
        <div 
          ref={formRef}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)] sm:p-12"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          
          <div className="relative">
            <h2 className="mb-4 text-center text-3xl font-extralight tracking-tight text-card-foreground sm:text-4xl">
              Be Among the First
            </h2>
            <p className="mb-8 text-center text-base font-light text-muted-foreground sm:text-lg">
              Join our exclusive waitlist and get early access to Gaber when we launch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-light text-card-foreground">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="h-12 bg-input/50 text-base backdrop-blur-sm transition-all duration-300 focus:bg-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-light text-card-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="h-12 bg-input/50 text-base backdrop-blur-sm transition-all duration-300 focus:bg-input"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative h-12 w-full overflow-hidden bg-primary text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-elegant)] disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs font-light text-muted-foreground">
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

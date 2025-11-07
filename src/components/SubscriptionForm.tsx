import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { trackConversion } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const formSchema = z.object({
  firstName: z.string().trim().min(2, { message: "Please enter your first name" }).max(50),
  lastName: z.string().trim().min(2, { message: "Please enter your last name" }).max(50),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255),
});

export default function SubscriptionForm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});
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
    setErrors({});
    
    try {
      const validated = formSchema.parse({ firstName, lastName, email });
      setIsSubmitting(true);
      
      // Save to database
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          first_name: validated.firstName,
          last_name: validated.lastName,
          email: validated.email,
        });

      if (error) {
        console.error('Subscription error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(error.message || 'Failed to submit');
      }
      
      // Track successful conversion
      trackConversion.waitlistSignup(validated.email);
      
      toast({
        title: "Welcome to Gaber!",
        description: "You're on the waitlist. We'll be in touch soon.",
        duration: 5000,
      });
      
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof z.ZodError) {
        const fieldErrors: { firstName?: string; lastName?: string; email?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Failed to join the waitlist. Please try again.';
        console.error('Detailed error:', errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
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
      className="relative pt-24 pb-32 px-4 md:px-6 lg:px-16"
    >
      <div className="mx-auto max-w-2xl">
        <div 
          ref={formRef}
          className="relative overflow-hidden rounded-3xl border-2 border-primary bg-white p-8 shadow-[var(--shadow-elegant)] sm:p-12"
        >
          
          <div className="relative">
            <h3 className="mb-4 text-center text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl md:text-4xl">
              Be Among the First
            </h3>
            <p className="mb-8 text-center text-base font-light text-card-foreground sm:text-lg">
              Join our exclusive waitlist and get early access to Gaber when we launch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-normal text-card-foreground">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) {
                        setErrors(prev => ({ ...prev, firstName: undefined }));
                      }
                    }}
                    className={`h-12 bg-white text-base border-2 transition-all duration-300 focus:border-primary ${
                      errors.firstName ? 'border-destructive focus:border-destructive' : 'border-gray-200'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-normal text-card-foreground">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) {
                        setErrors(prev => ({ ...prev, lastName: undefined }));
                      }
                    }}
                    className={`h-12 bg-white text-base border-2 transition-all duration-300 focus:border-primary ${
                      errors.lastName ? 'border-destructive focus:border-destructive' : 'border-gray-200'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-normal text-card-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                  className={`h-12 bg-white text-base border-2 transition-all duration-300 focus:border-primary ${
                    errors.email ? 'border-destructive focus:border-destructive' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>
                )}
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

import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary text-primary-foreground py-12 px-4 md:px-6 lg:px-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">Contact</h3>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              <span>contact@example.com</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2 text-center md:text-right">
              <a
                href="/terms"
                className="hover:opacity-80 transition-opacity"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                className="hover:opacity-80 transition-opacity"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-90">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

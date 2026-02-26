import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "1234567890"; // Replace with actual
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Taste & Craviing! I want to order...")}`;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-bold font-display text-primary tracking-tight"
        >
          Taste & Craviing
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location === link.href ? "text-accent" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-5 shadow-lg shadow-accent/25 hover:-translate-y-0.5 transition-all text-base font-semibold">
              <MessageCircle className="w-5 h-5 mr-2" />
              Order Now
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-lg font-medium px-4 py-2 rounded-lg ${
                    location === link.href ? "bg-primary/5 text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-border">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="block w-full">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-6 text-lg font-semibold">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Order on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

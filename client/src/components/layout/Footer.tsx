import { Link } from "wouter";
import { Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { useSubscriberMutation } from "@/hooks/use-api";

export function Footer() {
  const subscribeMutation = useSubscriberMutation();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = (data: InsertSubscriber) => {
    subscribeMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Social */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Taste & Craviing</h2>
            <p className="text-primary-foreground/80 leading-relaxed text-balance">
              Serving the most delicious waffles, pancakes, shakes, and more. Satisfy your sweet tooth with every bite.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Menu', 'Offers', 'About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-primary-foreground/80 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Visit Us Today</h3>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-1 text-accent" />
                <span>123 Dessert Lane, Sweet District<br/>Food City, FC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-accent" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-accent" />
                <span>hello@tasteandcraviing.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="relative">
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-3 text-white placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
                {form.formState.errors.email && (
                  <span className="text-sm text-red-300 absolute -bottom-6 left-0">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-3 font-semibold transition-all hover:shadow-lg disabled:opacity-70 mt-4"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Taste & Craviing. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tag, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const OFFERS = [
  {
    type: "Weekly",
    title: "Waffle Wednesday",
    desc: "Buy 2 Classic Waffles, get a FREE Thick Chocolate Shake.",
    icon: <Clock className="w-8 h-8 text-white" />,
    color: "bg-primary",
    validity: "Wednesdays, 2 PM - 6 PM"
  },
  {
    type: "Current Deal",
    title: "Weekend Breakfast Combo",
    desc: "Any Pancake + Cold Coffee for just $12.99",
    icon: <Sparkles className="w-8 h-8 text-white" />,
    color: "bg-accent",
    validity: "Saturday & Sunday"
  },
  {
    type: "Limited Time",
    title: "Summer Refresher",
    desc: "20% off on all Mocktails and Fruit Shakes.",
    icon: <Tag className="w-8 h-8 text-white" />,
    color: "bg-foreground",
    validity: "Valid until Aug 31st"
  }
];

export default function Offers() {
  const WHATSAPP_LINK = `https://wa.me/1234567890?text=${encodeURIComponent("Hi! I'd like to claim an offer...")}`;

  return (
    <AppLayout>
      <div className="bg-background min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">Sweet Deals</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Treat yourself to our special promotions and seasonal offers. Grab them before they're gone!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS.map((offer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-border shadow-lg flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`${offer.color} p-8 text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_2px,transparent_2px)] [background-size:16px_16px]" />
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 backdrop-blur-sm">
                    {offer.icon}
                  </div>
                  <span className="text-white/90 font-semibold tracking-wider uppercase text-sm relative z-10">{offer.type}</span>
                </div>
                
                <div className="p-8 flex-grow flex flex-col text-center">
                  <h3 className="text-2xl font-display font-bold mb-3">{offer.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{offer.desc}</p>
                  
                  <div className="bg-secondary/50 py-2 px-4 rounded-lg mb-6 border border-secondary">
                    <span className="text-sm font-semibold text-foreground">Valid: {offer.validity}</span>
                  </div>
                  
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-6 font-semibold shadow-lg shadow-accent/20">
                      Claim via WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Newsletter Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 bg-primary text-primary-foreground rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
             <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 relative z-10">Never Miss a Deal</h3>
             <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto relative z-10">
               Join our VIP list to get exclusive offers and secret menu items delivered straight to your inbox.
             </p>
             <Link href="#footer" onClick={(e) => {
               e.preventDefault();
               document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
             }} className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all relative z-10">
               Subscribe Now
             </Link>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Heart, Target, Users } from "lucide-react";

export default function About() {
  return (
    <AppLayout>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <section className="py-20 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-display font-bold mb-6 text-foreground"
            >
              The Taste & Craviing Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Turning simple ingredients into extraordinary moments.
            </motion.p>
          </div>
        </section>

        {/* Story & Mission Content */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 md:order-1 space-y-6"
              >
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Heart className="w-6 h-6" />
                  <span className="font-semibold tracking-wider uppercase">Our Story</span>
                </div>
                <h2 className="text-4xl font-display font-bold">Born from a craving, built with passion.</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  It all started with a simple craving for a truly authentic Belgium waffle late one evening. Disappointed by what was available, our founders set out on a culinary journey to perfect the ideal waffle batter. 
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Months of testing, tasting, and tweaking led to the birth of Taste & Craviing. What began as a small popup cart has blossomed into a beloved destination for dessert lovers everywhere.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-auto"
              >
                {/* cafe setting image */}
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80" 
                  alt="Cafe Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-auto"
              >
                {/* making waffles image */}
                <img 
                  src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80" 
                  alt="Making Waffles"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Target className="w-6 h-6" />
                  <span className="font-semibold tracking-wider uppercase">Our Mission</span>
                </div>
                <h2 className="text-4xl font-display font-bold">Uncompromising Quality</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We believe that great food starts with great ingredients. That's why we source the finest flour, premium chocolate, and farm-fresh fruits. 
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Our mission is simple: to serve happiness on a plate. Whether you're grabbing a quick cold coffee or sitting down for a mountain of Nutella pancakes, we want every visit to feel like a treat.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-24 bg-secondary/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 text-primary mb-4">
              <Users className="w-6 h-6" />
              <span className="font-semibold tracking-wider uppercase">The Team</span>
            </div>
            <h2 className="text-4xl font-display font-bold mb-16">Meet the Makers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                { name: "Alex Rivers", role: "Head Chef & Founder", desc: "The mastermind behind our secret batter recipe." },
                { name: "Jordan Lee", role: "Beverage Director", desc: "Crafting the perfect milkshakes and cold coffees." },
                { name: "Sam Gupta", role: "Operations Manager", desc: "Ensuring every order goes out perfectly and on time." }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-display text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-1">{member.name}</h3>
                  <p className="text-accent font-semibold mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

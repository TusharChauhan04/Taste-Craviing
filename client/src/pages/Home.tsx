import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Clock, MapPin, Instagram } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  return (
    <AppLayout>
      {/* 1. Hero Banner Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
        {/* aesthetic dark background layer */}
        <div className="absolute inset-0 z-0 bg-primary/5" />
        
        {/* landing page hero delicious waffles image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80"
            alt="Delicious Waffles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-semibold tracking-wider text-sm mb-6 border border-accent/20"
            >
              FRESHLY BAKED EVERY DAY
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6"
            >
              Sweeten Your Day With <span className="text-primary italic">Taste & Craviing</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 text-balance"
            >
              Indulge in our premium Belgium waffles, fluffy pancakes, thick shakes, and refreshing mocktails. Crafted with love, served with joy.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/menu" className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1">
                Explore Menu
              </Link>
              <Link href="/offers" className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white text-foreground border-2 border-border font-semibold text-lg hover:border-primary hover:text-primary transition-all">
                View Offers
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Featured Menu Items Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Signature Delights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our most loved creations that keep customers coming back for more.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Classic Belgium Waffle",
                desc: "Crispy on the outside, fluffy inside, topped with melted butter and maple syrup.",
                img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80",
              },
              {
                name: "Nutella Overload Pancake",
                desc: "Stack of buttermilk pancakes layered with rich Nutella and fresh strawberries.",
                img: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80",
              },
              {
                name: "Thick Chocolate Shake",
                desc: "Premium Belgian chocolate blended with homemade vanilla ice cream.",
                img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80",
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-background rounded-3xl overflow-hidden hover-lift border border-border/50 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-3">{item.name}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{item.desc}</p>
                  <Link href="/menu" className="text-primary font-semibold flex items-center group-hover:text-accent transition-colors">
                    Order Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Us Teaser Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* about section chef preparing food */}
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80" 
                alt="Our Story" 
                className="rounded-3xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Baked with Passion, Served with Love</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Taste & Craviing started as a humble cart with a simple mission: to serve the most authentic, mouth-watering waffles in town. Over the years, we've perfected our secret batter recipe to ensure every bite is a moment of pure bliss.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Today, our menu has grown, but our commitment to quality ingredients and delightful experiences remains unchanged.
              </p>
              <Link href="/about" className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                Read Our Full Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Offers Highlight Section */}
      <section className="py-20 bg-accent relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <span className="text-white/90 font-semibold tracking-wider uppercase text-sm mb-4 block">Limited Time</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Waffle Wednesday!</h2>
            <p className="text-xl text-white/90 mb-10 text-balance">
              Buy any two classic waffles and get a free thick chocolate shake. Valid every Wednesday from 2 PM to 6 PM.
            </p>
            <Link href="/offers" className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white text-accent font-bold text-lg hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all">
              Claim Offer
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Happy Cravings</h2>
            <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Hands down the best waffles I've ever had. The crunch is unbelievable!", author: "Sarah M." },
              { text: "Their Nutella pancakes are my weekend ritual. Highly recommend the cold coffee too.", author: "James L." },
              { text: "Incredible taste and lovely packaging. The presentation is as good as the flavor.", author: "Priya K." }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 rounded-3xl border border-border"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
                </div>
                <p className="text-lg italic text-foreground mb-6">"{review.text}"</p>
                <p className="font-semibold text-primary">- {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Visit Us Today Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 md:p-20 text-primary-foreground flex flex-col justify-center">
              <motion.h2 {...fadeInUp} className="text-4xl font-display font-bold mb-8">Visit Us Today</motion.h2>
              
              <motion.div {...fadeInUp} className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">Our Location</h4>
                    <p className="text-primary-foreground/80">123 Dessert Lane, Sweet District<br/>Food City, FC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">Opening Hours</h4>
                    <p className="text-primary-foreground/80">Mon - Fri: 10:00 AM - 10:00 PM<br/>Sat - Sun: 9:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="mt-12 pt-8 border-t border-primary-foreground/20">
                <p className="text-lg mb-4">Follow us for daily cravings!</p>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                  <Instagram className="w-5 h-5" />
                  @tasteandcraviing
                </a>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 h-64 md:h-auto relative">
              {/* placeholder map aesthetic food image */}
              <img 
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80" 
                alt="Our Cafe" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </AppLayout>
  );
}

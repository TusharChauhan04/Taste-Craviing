import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const POSTS = [
  {
    id: 1,
    title: "The Secret to the Perfect Belgium Waffle",
    excerpt: "Ever wondered what makes our waffles so incredibly crispy on the outside and fluffy on the inside? We're sharing a little peek into our kitchen...",
    date: "Aug 15, 2023",
    author: "Chef Alex",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80",
    category: "Behind the Scenes"
  },
  {
    id: 2,
    title: "New Summer Menu: Refreshing Mocktails",
    excerpt: "Beat the heat with our brand new lineup of refreshing mocktails. From the classic Blue Lagoon to our signature Berry Blast.",
    date: "Jul 02, 2023",
    author: "Jordan Lee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80",
    category: "New Arrivals"
  },
  {
    id: 3,
    title: "Why Nutella and Pancakes Are a Match Made in Heaven",
    excerpt: "The science and art behind combining warm, fluffy pancakes with rich, chocolatey Nutella. Warning: May cause intense cravings.",
    date: "Jun 10, 2023",
    author: "Sam Gupta",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80",
    category: "Food Stories"
  }
];

export default function Blog() {
  return (
    <AppLayout>
      <div className="bg-background min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">Updates & Stories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay in the loop with what's cooking at Taste & Craviing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-border shadow-lg flex flex-col group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`#post-${post.id}`} className="inline-flex items-center text-accent font-semibold hover:text-primary transition-colors">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Load More Stories
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

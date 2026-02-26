import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Coffee, IceCream, UtensilsCrossed } from "lucide-react";

const MENU_CATEGORIES = [
  {
    id: "waffles",
    title: "Belgium Waffles",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: [
      { name: "Classic Honey & Butter", price: "$6.99", desc: "Traditional Belgium waffle with maple syrup and whipped butter." },
      { name: "Nutella Hazelnut", price: "$8.99", desc: "Loaded with rich Nutella and roasted crushed hazelnuts." },
      { name: "Strawberry Cream", price: "$9.50", desc: "Fresh strawberries, strawberry sauce, and whipped cream." },
      { name: "Dark Chocolate Overload", price: "$10.00", desc: "Dark chocolate batter, chocolate chips, and fudge sauce." },
    ]
  },
  {
    id: "pancakes",
    title: "Fluffy Pancakes",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: [
      { name: "Classic Buttermilk", price: "$7.50", desc: "Stack of 3 fluffy pancakes with maple syrup." },
      { name: "Blueberry Bliss", price: "$9.00", desc: "Fresh blueberries folded into batter, topped with compote." },
      { name: "Banana Pecan", price: "$9.50", desc: "Caramelized bananas and candied pecans." },
    ]
  },
  {
    id: "shakes",
    title: "Thick Shakes",
    icon: <IceCream className="w-6 h-6" />,
    items: [
      { name: "Vanilla Bean", price: "$5.99", desc: "Made with real Madagascar vanilla beans." },
      { name: "Double Chocolate", price: "$6.99", desc: "Rich chocolate ice cream with fudge brownie pieces." },
      { name: "Oreo Crunch", price: "$7.50", desc: "Crushed Oreos blended with vanilla soft serve." },
    ]
  },
  {
    id: "coffee",
    title: "Cold Coffee & Mocktails",
    icon: <Coffee className="w-6 h-6" />,
    items: [
      { name: "Classic Frappe", price: "$5.50", desc: "Blended iced coffee with milk and light syrup." },
      { name: "Caramel Macchiato", price: "$6.50", desc: "Espresso, milk, vanilla, and caramel drizzle." },
      { name: "Virgin Mojito", price: "$5.00", desc: "Mint, lime, and sparkling soda water." },
      { name: "Blue Lagoon", price: "$5.50", desc: "Blue curacao, lemon juice, and lemonade." },
    ]
  }
];

export default function Menu() {
  return (
    <AppLayout>
      <div className="bg-background min-h-screen pb-24">
        {/* Menu Header */}
        <div className="bg-primary text-primary-foreground py-20 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-6xl font-display font-bold mb-4 relative z-10"
           >
             Our Menu
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-primary-foreground/80 max-w-2xl mx-auto relative z-10"
           >
             Discover a world of sweet and savory delights.
           </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 bg-white p-6 rounded-3xl border border-border shadow-sm">
                <h3 className="font-display font-bold text-xl mb-4">Categories</h3>
                <ul className="space-y-2">
                  {MENU_CATEGORIES.map(category => (
                    <li key={category.id}>
                      <a href={`#${category.id}`} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 text-foreground hover:text-primary font-medium transition-colors">
                        {category.icon}
                        {category.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#addons" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 text-foreground hover:text-primary font-medium transition-colors">
                      Add-on Options
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Menu Content */}
            <div className="lg:col-span-9 space-y-20">
              {MENU_CATEGORIES.map((category, idx) => (
                <motion.section 
                  key={category.id}
                  id={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-display font-bold">{category.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <span className="font-bold text-primary">{item.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              ))}

              {/* Add-ons */}
              <motion.section 
                id="addons"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary p-8 md:p-12 rounded-3xl"
              >
                <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Make it Extra Special</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Extra Nutella", price: "+$1.50" },
                    { name: "Vanilla Ice Cream", price: "+$2.00" },
                    { name: "Fresh Strawberries", price: "+$1.50" },
                    { name: "Chocolate Chips", price: "+$1.00" },
                    { name: "Whipped Cream", price: "+$1.00" },
                    { name: "Caramel Drizzle", price: "+$1.00" },
                  ].map((addon, i) => (
                    <div key={i} className="bg-white/60 p-4 rounded-xl text-center border border-white">
                      <h5 className="font-semibold text-sm mb-1">{addon.name}</h5>
                      <span className="text-accent font-bold text-sm">{addon.price}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

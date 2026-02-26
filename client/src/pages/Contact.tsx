import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-api";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const contactMutation = useContactMutation();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <AppLayout>
      <div className="bg-background min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question about our menu, catering, or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-border shadow-xl"
            >
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Send us a Message</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone (Optional)</label>
                    <input
                      {...form.register("phone")}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <textarea
                    {...form.register("message")}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full py-6 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  {contactMutation.isPending ? "Sending..." : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <Phone className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold font-display text-xl mb-2">Call Us</h3>
                  <p className="text-muted-foreground">+1 (234) 567-890</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold font-display text-xl mb-2">Email Us</h3>
                  <p className="text-muted-foreground">hello@tasteandcraviing.com</p>
                </div>
                <div className="sm:col-span-2 bg-accent/5 p-6 rounded-2xl border border-accent/10 flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold font-display text-xl mb-2">Visit Us</h3>
                    <p className="text-muted-foreground">123 Dessert Lane, Sweet District<br/>Food City, FC 12345</p>
                    <p className="text-sm font-semibold text-foreground mt-2">Open Daily: 10 AM - 10 PM</p>
                  </div>
                </div>
              </div>

              {/* Placeholder Map */}
              <div className="w-full h-64 rounded-3xl overflow-hidden bg-secondary border border-border shadow-inner relative">
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
                  <span className="text-foreground font-semibold px-4 py-2 bg-white rounded-lg shadow-sm border border-border">Interactive Map Display</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

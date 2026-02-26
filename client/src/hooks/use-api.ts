import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertContactMessage, type InsertSubscriber } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useContactMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send message");
      }
      
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useSubscriberMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const validated = api.subscribers.create.input.parse(data);
      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to subscribe");
      }
      
      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Welcome to the Taste & Craviing family.",
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

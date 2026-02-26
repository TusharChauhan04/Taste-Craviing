import { db } from "./db";
import {
  contactMessages,
  subscribers,
  type InsertContactMessage,
  type InsertSubscriber,
  type ContactMessage,
  type Subscriber
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db.insert(subscribers).values(insertSubscriber).returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }
}

export const storage = new DatabaseStorage();

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Primary Guest Information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  mailingAddress: text("mailing_address").notNull(),
  
  // Reservation Details
  checkIn: text("check_in").notNull(), // stored as ISO date string
  
  // Guest Count Information
  numberOfGuests: integer("number_of_guests").notNull().default(1),
  
  // Emergency Contact Information
  emergencyContact1Name: text("emergency_contact_1_name").notNull(),
  emergencyContact1Relationship: text("emergency_contact_1_relationship").notNull(),
  emergencyContact1Phone: text("emergency_contact_1_phone").notNull(),
  
  // RV Information
  rvType: text("rv_type").notNull(), // motorhome, travel-trailer, fifth-wheel
  rvLength: integer("rv_length").notNull(),
  rvMake: text("rv_make"),
  rvModel: text("rv_model"),
  rvYear: text("rv_year"),
  slideOuts: integer("slide_outs").default(0),
  
  // Electrical Requirements
  powerService: text("power_service").notNull(), // 30amp, 50amp
  waterHookup: boolean("water_hookup").default(true),
  sewerHookup: boolean("sewer_hookup").default(true),
  
  // Generator Information
  hasGenerator: boolean("has_generator").default(false),
  generatorType: text("generator_type"),
  generatorWattage: integer("generator_wattage"),
  
  // Additional
  specialRequests: text("special_requests"),
  
  // Agreement Acknowledgment (not required for interest form)
  agreesToTerms: boolean("agrees_to_terms").default(false),
  agreesToRules: boolean("agrees_to_rules").default(false),
  agreesToLiabilityWaiver: boolean("agrees_to_liability_waiver").default(false),
  
  // SMS Opt-in
  agreesToSmsMarketing: boolean("agrees_to_sms_marketing").notNull(),
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull().default("Evadale RV Park"),
  tags: text("tags").array().notNull(),
  imageAlt: text("image_alt"),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

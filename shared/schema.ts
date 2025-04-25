import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  orgCode: text("org_code"),
});

export const analysis = pgTable("analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  targetAccount: text("target_account").notNull(),
  contentType: text("content_type").notNull(),
  content: text("content").notNull(),
  semanticAnalysis: text("semantic_analysis"),
  threatAnalysis: text("threat_analysis"),
  createdAt: text("created_at").notNull(), // store as ISO string
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(), // store as ISO string
  resolved: boolean("resolved").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  orgCode: true,
});

export const insertAnalysisSchema = createInsertSchema(analysis).pick({
  userId: true,
  targetAccount: true,
  contentType: true,
  content: true,
  semanticAnalysis: true,
  threatAnalysis: true,
  createdAt: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).pick({
  name: true,
  email: true,
  type: true,
  message: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analysis.$inferSelect;

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;

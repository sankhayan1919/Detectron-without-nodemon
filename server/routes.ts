import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { setupAnalysis } from "./analysis";
import { z } from "zod";
import { insertContactRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // Set up analysis routes
  setupAnalysis(app);
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactRequestSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      
      const contactRequest = await storage.createContactRequest(data);
      res.status(201).json({ success: true, id: contactRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An error occurred while processing your request" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

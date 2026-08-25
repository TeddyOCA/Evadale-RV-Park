import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const apiKey = process.env.BLOG_API_KEY;

  if (!apiKey) {
    res.status(500).json({ message: "Blog API key not configured" });
    return;
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header. Use: Bearer <API_KEY>" });
    return;
  }

  const token = authHeader.slice(7);
  if (token !== apiKey) {
    res.status(403).json({ message: "Invalid API key" });
    return;
  }

  next();
}

// Function to send webhook to Lindy.ai
async function notifyLindy(reservationData: any) {
  const lindyWebhookUrl = process.env.LINDY_WEBHOOK_URL;
  const lindySecret = process.env.LINDY_WEBHOOK_SECRET;
  
  console.log("🔔 Attempting to send Lindy webhook notification for:", reservationData.id);
  console.log("📍 Webhook URL configured:", lindyWebhookUrl ? "YES" : "NO");
  
  if (!lindyWebhookUrl) {
    console.log("❌ Lindy webhook URL not configured, skipping notification");
    return;
  }

  try {
    const webhookPayload = {
      event: "new_reservation",
      timestamp: new Date().toISOString(),
      data: {
        id: reservationData.id,
        name: `${reservationData.firstName} ${reservationData.lastName}`,
        email: reservationData.email,
        phone: reservationData.phone,
        checkIn: reservationData.checkIn,
        rvType: reservationData.rvType,
        rvLength: reservationData.rvLength,
        rvMake: reservationData.rvMake || "Not specified",
        rvModel: reservationData.rvModel || "Not specified", 
        rvYear: reservationData.rvYear || "Not specified",
        slideOuts: reservationData.slideOuts || 0,
        powerService: reservationData.powerService,
        waterHookup: reservationData.waterHookup || false,
        sewerHookup: reservationData.sewerHookup || false,
        hasGenerator: reservationData.hasGenerator || false,
        generatorType: reservationData.generatorType || "None",
        generatorWattage: reservationData.generatorWattage || 0,
        specialRequests: reservationData.specialRequests || "None",
        emergencyContact: {
          name: reservationData.emergencyContact1Name,
          relationship: reservationData.emergencyContact1Relationship,
          phone: reservationData.emergencyContact1Phone
        },
        smsOptIn: reservationData.agreesToSmsMarketing,
        submittedAt: reservationData.createdAt
      }
    };

    const headers: any = {
      'Content-Type': 'application/json'
    };

    if (lindySecret) {
      headers['Authorization'] = `Bearer ${lindySecret}`;
    }

    console.log("📤 Sending webhook payload:", JSON.stringify(webhookPayload, null, 2));
    console.log("🔑 Using Authorization header:", lindySecret ? "YES (Bearer token set)" : "NO");
    
    const response = await fetch(lindyWebhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(webhookPayload)
    });

    console.log("📨 Webhook response status:", response.status);
    
    if (response.ok) {
      console.log("✅ Lindy notification sent successfully");
    } else {
      const responseText = await response.text();
      console.error("❌ Failed to send Lindy notification:", response.status, response.statusText);
      console.error("❌ Response body:", responseText);
    }
  } catch (error) {
    console.error("❌ Error sending Lindy notification:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      
      // Send notification to Lindy.ai (non-blocking)
      notifyLindy(reservation).catch(console.error);
      
      res.status(201).json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to create reservation" 
        });
      }
    }
  });

  // Get all reservations (for admin)
  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch reservations" 
      });
    }
  });

  // Get specific reservation
  app.get("/api/reservations/:id", async (req, res) => {
    try {
      const reservation = await storage.getReservation(req.params.id);
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch reservation" 
      });
    }
  });

  // Delete reservation
  app.delete("/api/reservations/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteReservation(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to delete reservation" 
      });
    }
  });

  // ---- Blog API (public read) ----

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        res.status(404).json({ message: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // ---- Blog API (requires API key) ----

  app.post("/api/blog", requireApiKey, async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  app.put("/api/blog/:id", requireApiKey, async (req, res) => {
    try {
      const updateSchema = insertBlogPostSchema.partial().omit({ publishedAt: true });
      const validatedData = updateSchema.parse(req.body);
      const updated = await storage.updateBlogPost(req.params.id, validatedData);
      if (!updated) {
        res.status(404).json({ message: "Blog post not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update blog post" });
      }
    }
  });

  app.delete("/api/blog/:id", requireApiKey, async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Blog post not found" });
        return;
      }
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

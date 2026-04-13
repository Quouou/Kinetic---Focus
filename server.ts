import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data Validation Schemas
const CheckInSchema = z.object({
  mood: z.string().min(1).max(50),
  focusGoal: z.string().min(5).max(200),
  durationMinutes: z.number().int().positive().max(480),
});

const TrackSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  time: z.string(),
  day: z.string(),
  icon: z.string(),
});

const DashboardDataSchema = z.object({
  focusScore: z.number().min(0).max(100),
  dailyMomentum: z.object({
    current: z.number().min(0),
    target: z.number().positive(),
  }),
  upcomingTracks: z.array(TrackSchema),
  learningNetwork: z.object({
    topPercent: z.number().min(0).max(100),
    friendsCount: z.number().nonnegative(),
  }),
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Data for Dashboard with Validation
  app.get("/api/dashboard", (req, res) => {
    const mockData = {
      focusScore: 85,
      dailyMomentum: {
        current: 4.5,
        target: 6,
      },
      upcomingTracks: [
        { id: 1, title: "Advance React", subtitle: "Hooks & Suspense Architecture", time: "90 min", day: "Tomorrow", icon: "code" },
        { id: 2, title: "UI Design", subtitle: "Typography & Hierarchy", time: "60 min", day: "Thursday", icon: "pen-tool" },
        { id: 3, title: "Algorithms", subtitle: "Dynamic Programming", time: "120 min", day: "Friday", icon: "braces" },
      ],
      learningNetwork: {
        topPercent: 5,
        friendsCount: 24,
      }
    };

    // Validate outgoing data
    const result = DashboardDataSchema.safeParse(mockData);
    if (!result.success) {
      return res.status(500).json({ error: "Invalid dashboard data structure", details: result.error.format() });
    }

    res.json(result.data);
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      monthlyTotal: 142,
      monthlyGrowth: 12,
      dailyAverage: 4.8,
      calendar: [
        { day: "MON", date: 12, status: "partial" },
        { day: "TUE", date: 13, status: "completed" },
        { day: "WED", date: 14, status: "completed" },
        { day: "THU", date: 15, status: "partial" },
        { day: "FRI", date: 16, status: "completed" },
        { day: "SAT", date: 17, status: "completed" },
        { day: "SUN", date: 18, status: "partial" },
      ],
      successfulCheckins: 22,
    });
  });

  // Example POST route with validation
  app.post("/api/check-in", (req, res) => {
    const result = CheckInSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: result.error.flatten().fieldErrors 
      });
    }

    // Process valid data
    console.log("Valid check-in received:", result.data);
    res.json({ message: "Check-in successful", data: result.data });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

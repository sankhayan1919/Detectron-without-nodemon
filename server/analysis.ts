import type { Express, Request, Response } from "express";
import { z } from "zod";
import { storage } from "./storage";

const analysisRequestSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  password: z.string().min(1, "Password is required"),
  targetAccount: z.string().min(1, "Target account is required"),
  contentType: z.string().min(1, "Content type is required"),
  content: z.string().min(1, "Content is required")
});

// Helper function for semantic analysis
function performSemanticAnalysis(content: string): string {
  // In a real implementation, this would use proper NLP algorithms
  // For this demo, we'll return a mock analysis
  const topics = ["social", "political", "personal", "business"];
  const sentiment = ["positive", "negative", "neutral"];
  const entities = ["person", "organization", "location", "event"];
  
  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  const selectedSentiment = sentiment[Math.floor(Math.random() * sentiment.length)];
  const selectedEntities = entities
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);
  
  const wordCount = content.split(/\s+/).length;
  const uniqueWordCount = new Set(content.toLowerCase().split(/\s+/)).size;
  
  return `Semantic Analysis Report
  
Content Length: ${content.length} characters
Word Count: ${wordCount} words
Unique Words: ${uniqueWordCount}

Primary Topic: ${selectedTopic}
Overall Sentiment: ${selectedSentiment}
Key Entities Detected: ${selectedEntities.join(", ")}

Language Patterns:
- Formality: ${Math.random() > 0.5 ? "Formal" : "Informal"}
- Technical terminology: ${Math.random() > 0.7 ? "Present" : "Not significant"}
- Emotional intensity: ${["Low", "Medium", "High"][Math.floor(Math.random() * 3)]}

Content appears to be ${Math.random() > 0.3 ? "original" : "potentially derivative"}.
`;
}

// Helper function for threat analysis
function performThreatAnalysis(content: string): string {
  // In a real implementation, this would use proper threat detection algorithms
  // For this demo, we'll return a mock analysis
  const threatLevel = ["Low", "Medium", "High", "Critical"];
  const selectedThreatLevel = threatLevel[Math.floor(Math.random() * threatLevel.length)];
  
  const indicators = [
    "Aggressive language",
    "Threatening statements",
    "Radicalization markers",
    "Violent imagery",
    "Conspiratorial rhetoric",
    "Extremist ideology",
    "Targeted harassment"
  ];
  
  // Select 0-3 random indicators
  const selectedIndicators = indicators
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3));
  
  return `Threat Analysis Report
  
Threat Level: ${selectedThreatLevel}
${selectedIndicators.length > 0 ? `
Indicators Detected:
${selectedIndicators.map(i => `- ${i}`).join('\n')}
` : 'No specific threat indicators detected.'}

Recommendation: ${
  selectedThreatLevel === "Low" ? "Routine monitoring" : 
  selectedThreatLevel === "Medium" ? "Enhanced monitoring" : 
  selectedThreatLevel === "High" ? "Escalate for review" : 
  "Immediate action required"
}

Analysis timestamp: ${new Date().toISOString()}
`;
}

export function setupAnalysis(app: Express) {
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Route to analyze social media content
  app.post("/api/analyze", isAuthenticated, async (req, res) => {
    try {
      const data = analysisRequestSchema.parse(req.body);
      
      // Perform analyses
      const semanticAnalysis = performSemanticAnalysis(data.content);
      const threatAnalysis = performThreatAnalysis(data.content);
      
      // Save analysis to database if user is authenticated
      if (req.user) {
        await storage.createAnalysis({
          userId: req.user.id,
          targetAccount: data.targetAccount,
          contentType: data.contentType,
          content: data.content,
          semanticAnalysis,
          threatAnalysis,
          createdAt: new Date().toISOString(),
        });
      }
      
      res.json({
        semanticAnalysis,
        threatAnalysis
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        console.error("Analysis error:", error);
        res.status(500).json({ message: "An error occurred during analysis" });
      }
    }
  });

  // Route to get analysis history for a user
  app.get("/api/analysis/history", isAuthenticated, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const analyses = await storage.getAnalysesByUserId(req.user.id);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      res.status(500).json({ message: "Failed to retrieve analysis history" });
    }
  });
}

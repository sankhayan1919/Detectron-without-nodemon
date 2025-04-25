import { users, type User, type InsertUser, analysis, type Analysis, type InsertAnalysis, contactRequests, type ContactRequest, type InsertContactRequest } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysisByID(id: number): Promise<Analysis | undefined>;
  getAnalysesByUserId(userId: number): Promise<Analysis[]>;
  
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
  updateContactRequest(id: number, resolved: boolean): Promise<ContactRequest | undefined>;
  
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private analyses: Map<number, Analysis>;
  private contactRequests: Map<number, ContactRequest>;
  sessionStore: session.SessionStore;
  currentId: number;
  currentAnalysisId: number;
  currentContactRequestId: number;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
    this.contactRequests = new Map();
    this.currentId = 1;
    this.currentAnalysisId = 1;
    this.currentContactRequestId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.currentAnalysisId++;
    const analysis: Analysis = { ...insertAnalysis, id };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysisByID(id: number): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getAnalysesByUserId(userId: number): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).filter(
      (analysis) => analysis.userId === userId
    );
  }

  async createContactRequest(insertContactRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactRequestId++;
    const contactRequest: ContactRequest = { ...insertContactRequest, id, resolved: false };
    this.contactRequests.set(id, contactRequest);
    return contactRequest;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }

  async updateContactRequest(id: number, resolved: boolean): Promise<ContactRequest | undefined> {
    const contactRequest = this.contactRequests.get(id);
    if (!contactRequest) {
      return undefined;
    }
    
    const updatedRequest = { ...contactRequest, resolved };
    this.contactRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();

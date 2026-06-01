export interface Project {
  id: string;
  title: string;
  role: string;
  tags: string[];
  year: string;
  imageUrl: string;
  description: string;
  challenge: string;
  solution: string;
  fullCaseUrl?: string;
  category: "Web Design" | "Mobile App" | "Case Study";
}

export interface Skill {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

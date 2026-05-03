export type Category = "all" | "research" | "tech" | "creative" | "gaming" | "social";

export type VerificationStatus = "verified" | "pending" | "unverified";

export interface ScorePillar {
  id: string;
  name: string;
  icon: string;
  score: number;
  weight: string;
  description: string;
  color: string;
  items: string[];
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  date: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
}

export interface Contestant {
  id: string;
  rank: number;
  avatar: string;
  name: string;
  handle: string;
  country: string;
  flag: string;
  university: string;
  niScore: number;
  scoreChange: number;
  categories: Category[];
  tags: string[];
  skills: { label: string; value: number; color: string }[];
  pillars: ScorePillar[];
  achievements: Achievement[];
  socials: SocialLink[];
  bio: string;
  followers: number;
  following: number;
  rankPercentile: string;
  joinedDate: string;
}

export interface LeaderboardFilter {
  category: Category;
  timeframe: "all" | "week" | "month" | "year";
  region: "global" | "country" | "university";
  search: string;
}

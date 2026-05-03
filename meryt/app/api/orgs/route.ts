import { NextResponse } from "next/server";

const ORGS = [
  { slug: "iit-bombay", name: "IIT Bombay", type: "University", country: "India", flag: "🇮🇳", members: 4820, avgScore: 7240, verified: true },
  { slug: "mit", name: "MIT", type: "University", country: "USA", flag: "🇺🇸", members: 3910, avgScore: 8120, verified: true },
  { slug: "stanford", name: "Stanford University", type: "University", country: "USA", flag: "🇺🇸", members: 4120, avgScore: 8340, verified: true },
  { slug: "cambridge", name: "University of Cambridge", type: "University", country: "UK", flag: "🇬🇧", members: 3140, avgScore: 7880, verified: true },
  { slug: "oxford", name: "University of Oxford", type: "University", country: "UK", flag: "🇬🇧", members: 2980, avgScore: 7620, verified: true },
  { slug: "eth-zurich", name: "ETH Zurich", type: "University", country: "Switzerland", flag: "🇨🇭", members: 1840, avgScore: 8010, verified: true },
  { slug: "tsinghua", name: "Tsinghua University", type: "University", country: "China", flag: "🇨🇳", members: 3560, avgScore: 7910, verified: true },
  { slug: "kaist", name: "KAIST", type: "University", country: "South Korea", flag: "🇰🇷", members: 2100, avgScore: 7480, verified: true },
  { slug: "caltech", name: "Caltech", type: "University", country: "USA", flag: "🇺🇸", members: 980, avgScore: 8720, verified: true },
  { slug: "tokyo-u", name: "University of Tokyo", type: "University", country: "Japan", flag: "🇯🇵", members: 2640, avgScore: 6980, verified: true },
];

export async function GET() {
  return NextResponse.json({
    data: ORGS.sort((a, b) => b.avgScore - a.avgScore),
    meta: { total: ORGS.length },
  });
}

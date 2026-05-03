import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MERYT — Global Verified Talent Rankings",
    short_name: "MERYT",
    description: "The NI Score — proof-of-work identity graph for students, researchers, builders, and creators. 28,400 verified profiles across 142 countries.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0E0B",
    theme_color: "#FF4500",
    orientation: "portrait-primary",
    categories: ["education", "productivity", "social"],
    icons: [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      { name: "Leaderboard", short_name: "Leaderboard", url: "/leaderboard", description: "View the global leaderboard" },
      { name: "Search", short_name: "Search", url: "/search", description: "Search verified profiles" },
      { name: "Verify", short_name: "Verify", url: "/verify", description: "Verify your credentials" },
    ],
  };
}

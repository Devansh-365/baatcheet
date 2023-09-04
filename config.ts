const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://baatcheet.vercel.app";

export const siteConfig = {
  name: "Baatcheet",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  description:
    "Connect Better with Baatcheet: Real-time Chats, Video Calls, and Dynamic Channels, Inspired by Discord.",
  links: {
    twitter: "https://twitter.com/devansh_0718",
    github: "https://github.com/Devansh-365/baatcheet",
  },
};

export type SiteConfig = typeof siteConfig;

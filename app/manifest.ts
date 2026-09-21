import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Loop Lord — Full Stack Developer",
    short_name: "Loop Lord",
    description:
      "The digital world of Loop Lord — Full-Stack Developer & founder of BITSANDBYTESDUDE.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

import g1 from "@/src/assets/g1.jpg";
import g2 from "@/src/assets/g2.jpg";
import g3 from "@/src/assets/g3.jpg";
import g4 from "@/src/assets/g4.jpg";
import g5 from "@/src/assets/g5.jpg";
import g6 from "@/src/assets/g6.jpg";
import g7 from "@/src/assets/g7.jpg";
import g8 from "@/src/assets/g8.jpg";

const getSrc = (img: any): string => (typeof img === "string" ? img : img.src);

export const IMG = {
  hero: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2000&q=80&auto=format&fit=crop",
  heroAlt: getSrc(g2),
  about: getSrc(g6),
  architecture: getSrc(g6),
  festival: getSrc(g8),
  darshan: getSrc(g1),
  location: getSrc(g7),
  gallery: [
    getSrc(g1),
    getSrc(g2),
    getSrc(g3),
    getSrc(g4),
    getSrc(g5),
    getSrc(g6),
    getSrc(g7),
    getSrc(g8),
    getSrc(g5),
    getSrc(g3),
    getSrc(g4),
    getSrc(g2),
  ],
};

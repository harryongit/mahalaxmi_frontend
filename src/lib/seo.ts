export const SITE_NAME = "Ambabai Mahalaxmi Temple, Kolhapur";
export const SITE_TITLE =
  "Shri Mahalakshmi Ambabai Temple Kolhapur – Online Puja, Darshan Timings & Seva Booking";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ambabaimahalaxmi.com").replace(/\/+$/, "");

export const SITE_DESCRIPTION =
  "Official online platform of Shri Mahalakshmi (Ambabai) Temple Kolhapur. Book online puja & seva, check darshan and aarti timings, explore festivals, temple history, and how to reach Kolhapur Mahalaxmi Mandir.";

export const TEMPLE_ADDRESS = {
  streetAddress: "Mahalaxmi Temple Road, Bava Ganapati Galli",
  addressLocality: "Kolhapur",
  addressRegion: "Maharashtra",
  postalCode: "416012",
  addressCountry: "IN",
};

export const TEMPLE_PHONE = "+91 231 265 4321";
export const TEMPLE_EMAIL = "info@mahalaxmikolhapur.com";
export const TEMPLE_LAT = "16.7028";
export const TEMPLE_LNG = "74.2404";

export const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

export const festivals = [
  {
    name: "Kirnotsav (Sun Rays Festival)",
    slug: "kirnotsav",
    image: `${SITE_URL}/festivals/kirnotsav.jpg`,
    description:
      "Rare natural miracle observed at Kolhapur Mahalaxmi Mandir when the setting sun's golden rays fall directly on the feet, waist, and face of Goddess Ambabai.",
  },
  {
    name: "Navratri Utsav",
    slug: "navratri",
    image: `${SITE_URL}/festivals/navratri.jpg`,
    description:
      "Nine sacred nights with 9 Alankar forms of Mahalaxmi, Gaja-Shringar processions, havan and daily Maha Aarti.",
  },
  {
    name: "Rathotsav (Chariot Procession)",
    slug: "rathotsav",
    image: `${SITE_URL}/festivals/rathotsav.jpg`,
    description:
      "Annual golden chariot procession of Goddess Ambabai through the historic streets of Kolhapur.",
  },
  {
    name: "Karthikai Deepotsav",
    slug: "karthikai-deepotsav",
    image: `${SITE_URL}/festivals/deepotsav.jpg`,
    description:
      "The temple courtyard is illuminated with 108,000 earthen oil lamps on this grand festival of light.",
  },
];
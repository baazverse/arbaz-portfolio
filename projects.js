// ============ SITE CONFIG — edit text, contact details and switches here ============
export const SITE = {
  name: "Arbaz Hasan",
  title: "Video Editor & Creative Content Specialist",
  email: "baazverse@gmail.com",
  whatsapp: "916395145846",
  whatsappText: "Hi Arbaz, I found your video editing portfolio and would like to discuss a project.",
  linkedin: "https://linkedin.com/in/arbaz-hasan",
  showAvailability: true,            // set false to hide the "Available" label
  availabilityText: "Available for Freelance Projects",
  formEndpoint: "",                  // optional: paste a Formspree/Netlify-style URL to send enquiries by form
  showTestimonials: false,           // keep false until you have real, permitted testimonials
  testimonials: [],                  // { quote, name, role }
};

// ============ PROJECTS — add a clip: drop files in /videos, add an object, set published: true ============
// slot: "work" shows in the gallery (featured: true = full-width first). slot: "about" shows beside the About copy.
// beforeSrc (optional) adds a Before / After switch in the player.
export const PROJECTS = [
  { id: "showreel", slot: "about", published: true, title: "Video Editing Showreel",
    category: "Showreel", platform: "YouTube / LinkedIn · 60s", aspectRatio: "16:9",
    description: "A 60-second cut of pacing, text animation and sound across my recent edits.",
    videoSrc: "videos/showreel.mp4", posterSrc: "videos/posters/showreel.webp" },
  { id: "before-after", slot: "work", published: true, title: "Before & After: Map Explainer",
    category: "Motion Graphics & Editing", platform: "Vertical · Reels / Shorts", aspectRatio: "9:16",
    description: "The same footage as a plain map, then reworked with animation, labels and rhythm.",
    videoSrc: "videos/after.mp4", beforeSrc: "videos/before.mp4", posterSrc: "videos/posters/after.webp" },
  { id: "motion", slot: "work", published: true, title: "Motion Graphics & Typography Edit",
    category: "Kinetic Typography", platform: "Vertical · Reels / Shorts", aspectRatio: "9:16",
    description: "Layered type, interface-style graphics and sound-led pacing around an on-camera clip.",
    videoSrc: "videos/motion.mp4", posterSrc: "videos/posters/motion.webp" },
  { id: "story", slot: "work", published: true, title: "Storytelling Edit",
    category: "Storytelling", platform: "Vertical · Reels / Shorts", aspectRatio: "9:16",
    description: "A story-led edit built on sequencing, openings and clear visual progression.",
    videoSrc: "videos/story.mp4", posterSrc: "videos/posters/story.webp" },
  { id: "intro", slot: "work", featured: true, published: true, title: "Introduction Video",
    category: "Intro", platform: "Landscape · 59s", aspectRatio: "16:9",
    description: "A short introduction to me and how I work.",
    videoSrc: "videos/intro.mp4", posterSrc: "videos/posters/intro.webp" },
];

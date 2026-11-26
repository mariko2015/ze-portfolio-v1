import s2cb from "@/images/project/s2c/s2c-banner.png"

import s2cc from "@/images/project/s2c/s2c-cover.png"

import s2c from "@/images/project/s2c/s2c-8 (1).png";

import s2c2 from "@/images/project/s2c/s2c-8 (2).png";

import s2c3 from "@/images/project/s2c/s2c-8 (3).png";

import s2c4 from "@/images/project/s2c/s2c-8 (4).png";

import s2c5 from "@/images/project/s2c/s2c-8 (5).png";

import s2c6 from "@/images/project/s2c/s2c-8 (6).png";

import s2c7 from "@/images/project/s2c/s2c-8 (7).png";

import s2c8 from "@/images/project/s2c/s2c-8 (8).png";

import ss from "@/images/project/sehatsantap/sehatsantap (1).png";

import ss2 from "@/images/project/sehatsantap/sehatsantap (2).png";

import ss3 from "@/images/project/sehatsantap/sehatsantap (3).png";

import ss4 from "@/images/project/sehatsantap/sehatsantap (4).png";

import ss5 from "@/images/project/sehatsantap/sehatsantap (5).png";

import ss6 from "@/images/project/sehatsantap/sehatsantap (6).png";

import ss7 from "@/images/project/sehatsantap/sehatsantap (7).png";

import ss8 from "@/images/project/sehatsantap/sehatsantap (8).png";

import ss9 from "@/images/project/sehatsantap/sehatsantap (9).png";

const ssImages = [
  ss.src,
  ss2.src,
  ss3.src,
  ss4.src,
  ss5.src,
  ss6.src,
  ss7.src,
  ss8.src,
  ss9.src,
]

const s2cImages = [
  s2cc.src,
  s2cb.src,
  s2c.src,
  s2c2.src,
  s2c3.src,
  s2c4.src,
  s2c5.src,
  s2c6.src,
  s2c7.src,
  s2c8.src,
];

export const cards = [
{
        id: 8,
    title: "Matani App",
    description: "Monitor & Manage your lands",
    images: s2cImages,
    ctaLink:"https://github.com/ezzeddinp/matani-app",
    ctaDescriptionLink: "Matani App",
    role: "Full-Stack",
    collaborators: "@paulus_billy, @cleon_maheswara",
    duration: "Sept 2025 - Oct 2025",
    tools: "React Native, AccuWeather API, Sentinel Hub API, OpenMeteo API, NodeJs, PostgreSQL, Gemini AI",
    content: () => (
      <p>
        Matani is An Agriculture app that me & my friend billy & cleon build for Hackathon. Matani helps small lands owners to monitor and manage their lands more efficiently by providing real-time data of NDVI, temperature, and humidity. The app offers personalized draw polyline for specific monitoring areas, weather forecasts, and a user-friendly interface to optimize crop and reduce resource wastage.
      </p>
    ),
  },
{
    id: 9,
    title: "SehatSantap",
    description: "Your personalized healthy food recommendation app",
    images: ssImages,
    ctaLink:"https://github.com/ezzeddinp",
    ctaDescriptionLink: "SehatSantap",
    role: "CTO",
    collaborators: "@Terence (CEO), @Ricky (CFO), @Jonathan (COO), @Juan (CMO)",
    duration: "Oct 2025 - Ongoing",
    tools: "NextJs, TailwindCSS, Supabase, Midtrans, Gemini AI",
    content: () => (
      <p>
        These are my group college entrepreneurship projects. SehatSantap is a healthy food recommendation app that leverages AI to provide personalized meal suggestions based on user preferences and dietary needs. Built with Next.js and TypeScript, the app features a sleek, responsive design using TailwindCSS. It integrates Supabase for secure user authentication and data management, while Midtrans handles seamless payment processing for premium features. Gemini AI powers the recommendation engine, ensuring users receive tailored meal plans that promote wellness and healthy eating habits.
      </p>
    )
  },
{
    id: 10,
    title: "ConsumerIQ",
    description: "AI-powered market demand validation. 1st Place, Featherless AI Track at Bright Data's Web Data UNLOCKED Hackathon.",
    images: ["/consumeriq.jpg"],
    ctaLink: "https://lnkd.in/g9_W6iGu",
    ctaDescriptionLink: "Pitch & repository",
    role: "Data Acquisition & Bright Data Integration",
    collaborators: "Louis Enggar Theo Dharma, Paulus Billiardo Putrakedua, Daffa Tarigan, Keisha Putri Theanny",
    duration: "May 2026 - June 2026",
    tools: "Bright Data, Data Pipelines, Backend Integration, AI Market Intelligence",
    content: () => (
      <div className="space-y-4">
        <p>ConsumerIQ helps consumer product founders validate market demand before investing in inventory, packaging, or advertising. Built by team SINGKONG, it earned 1st Place in the Featherless AI Track at Bright Data&apos;s Web Data UNLOCKED Hackathon, an international competition with 2,310 participants and 766 teams.</p>
        <p>My primary responsibility was implementing the data acquisition pipeline using Bright Data. I connected web data collection with backend processing and the ConsumerIQ dashboard, helping turn raw market signals into actionable insights for founders.</p>
        <p>The team combined product definition, dashboard development, a multi-model AI pipeline, infrastructure, and data insight design to deliver an end-to-end market validation experience.</p>
        <a href="https://lnkd.in/gmAQdwSD" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline dark:text-teal-300">View hackathon results</a>
      </div>
    ),
  },
{
    id: 11,
    title: "Skyline",
    description: "Interactive lunar mission planning for the NASA Space Apps Challenge 2026: terrain, sunlight, Earth visibility, and relay communication.",
    images: ["/skyline.jpg"],
    ctaLink: "https://skyline.dftrg.com",
    ctaDescriptionLink: "Visit Skyline",
    role: "Backend Developer - Go API Gateway & Scientific Service Integration",
    collaborators: "System analysts, frontend developers, and data-science contributors",
    duration: "August 2026 - November 2026",
    tools: "Go, REST APIs, NASA Terrain & Ephemeris Data, Docker, Unit Testing",
    content: () => (
      <div className="space-y-4">
        <p>Skyline is an interactive lunar mission planning platform developed for the NASA Space Apps Challenge. It analyzes sunlight availability, terrain-based Earth visibility, relay communication gaps, and potential rover or solar mast placement at lunar landing sites using NASA terrain and ephemeris data.</p>
        <p>I collaborated with system analysts, frontend developers, and data-science contributors to align requirements, API contracts, data formats, and system expectations. I translated these requirements into backend solutions by developing and maintaining the Go API gateway and integrating scientific computation services.</p>
        <p>My work also covered API validation and error handling, support for Docker-based deployment, and unit tests for scientific contracts and mission-calculation modules.</p>
      </div>
    ),
  }
];

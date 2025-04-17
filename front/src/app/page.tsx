'use client';

import LandingView from "@/components/LandingView";

const features = [
  {
    id: "generate",
    title: "Generate Ideas",
    description: "Instantly create fresh concepts for your ebook",
    icon: "/icons/bulb.svg",
    bgColor: "bg-[#FFE082]"
  },
  {
    id: "customize",
    title: "Fun Customization",
    description: "Personalize your ebook with playful styles",
    icon: "/icons/pencil.svg",
    bgColor: "bg-[#FF9ECD]"
  },
  {
    id: "export",
    title: "Easy Export",
    description: "Save and share your ebook effortlessly",
    icon: "/icons/export.svg",
    bgColor: "bg-[#80CBC4]"
  }
];

export default function Home() {
  return (
    <LandingView 
      appName="Writealo"
      features={features}
    />
  );
}

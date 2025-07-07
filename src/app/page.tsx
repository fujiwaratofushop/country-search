import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country Search",
  description: "🌍🔎",
};

export default function Home() {
  return (
    <div className="absolute w-full h-screen">
      {/* Background image */}
      <img
        src="/world.jpg"
        alt="World background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white opacity-50 z-10" />



    </div>
  );
}
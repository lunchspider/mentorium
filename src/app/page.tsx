import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShowcaseProject from "@/components/Showcase";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 flex flex-col gap-20 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to MENTORIUM
            </h1>
            <p className="mx-auto max-w-[700px] mt-4 text-lg">
              A vibrant ecosystem that brings together the worlds of innovation
              and mentorship.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="grid grid-cols-1 gap-8 px-44 md:grid-cols-2 lg:grid-cols-3">
            <ShowcaseProject
              title="Mentor as a Catalyst"
              description="Mentorship is more than just guidance—its a catalyst for personal and professional growth. Mentorium aims to empower mentees to reach their full potential."
            />
            <ShowcaseProject
              title="Enabling Collaboration"
              description="Mentorium is not just a platform; it's a collaborative space where ideas are born, refined, and brought to life."
            />
            <ShowcaseProject
              title="Innovation at the Forefront"
              description="Whether youre a mentee with a groundbreaking project or a mentor with a unique perspective, our platform is the canvas where innovation thrives."
            />
          </div>
        </div>
      </section>
    </>
  );
}

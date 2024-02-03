import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShowcaseProject from "@/components/Showcase";
import Showcase2Project from "@/components/Showcase2";
import Showcase3Project from "@/components/Showcase3";
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
              A vibrant ecosystem that brings together the worlds of innovation and mentorship.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
            <ShowcaseProject />
            <Showcase2Project />
            <Showcase3Project />
          </div>
        </div>
      </section>
    </>
  );
}

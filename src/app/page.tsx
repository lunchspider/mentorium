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
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col gap-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to Our Community
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Join our community and stay updated with the latest news and
                events.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your name"
                  type="text"
                />
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            <ShowcaseProject />
            <Showcase2Project />
            <Showcase3Project />
            {/* <ShowcasePro3ect /> */}
          </div>
        </div>
      </section>
    </>
  );
}

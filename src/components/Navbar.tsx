import { ModeToggle } from "./Darkmode";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResumeIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white dark:bg-gray-800">
      <Link className="flex items-center gap-2" href="/">
        <ResumeIcon className="h-6 w-6" />
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Mentorium
        </span>
      </Link>
      <div className="ml-auto flex gap-2">
        <Link href="/sign-in">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
        <div className="ml-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

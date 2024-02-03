import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <nav className="flex gap-6">
            <Link className="text-sm font-medium " href="#">
              Home
            </Link>
            <Link className="text-sm font-medium " href="#">
              About Us
            </Link>
            <Link className="text-sm font-medium " href="#">
              Services
            </Link>
            <Link className="text-sm font-medium " href="/contactUs">
              Contact Us
            </Link>
          </nav>
          <p className="text-sm ">© 2024 ABC Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

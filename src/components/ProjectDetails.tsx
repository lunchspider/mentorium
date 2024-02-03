import { Button } from "@/components/ui/button";
import { User } from "@/db/schema";
import Link from "next/link";

export default function ProjectDetails({ userDetails }: { userDetails: User }) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          Project Title
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This is a brief description of the project. It covers the main
          functionalities and the problem it solves.
        </p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tech Stack
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              React, Node.js, Express, MongoDB
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </dd>
            <Link
              href={`/project/1/${
                userDetails.role === "mentor" ? "feedback" : "description"
              }`}
            >
              <Button className="w-32 mt-3">Check Now</Button>
            </Link>
          </div>
        </dl>
      </div>
    </div>
  );
}

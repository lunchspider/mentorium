import { get_project } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { User } from "@/db/schema";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProjectDetails({
  userDetails,
  project_id,
}: {
  userDetails: User;
  project_id: string;
}) {
  const project = await get_project(project_id);
  if (!project) {
    console.log("project not found");
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {project.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
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
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                {project.category}
              </span>
            </dd>
            <Link
              href={`/project/${project.id}/${
                userDetails.role === "mentor" ? "feedback" : "description"
              }`}
            >
              <Button className="w-32 mt-3">View Project</Button>
            </Link>
          </div>
        </dl>
      </div>
    </div>
  );
}

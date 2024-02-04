"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Project } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/auth";
import { User } from "@/db/schema";
import { join_project } from "@/actions/project";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ViewProject({
  projectDetails,
  student,
  userMentor,
}: {
  projectDetails: Project;
  student: { name: string; email: string };
  userMentor: User;
}) {
  const [load, setLoad] = useState(false);

  const { toast } = useToast();
  const on_join_project = async () => {
    try {
      setLoad(true);
      const teacher = (await getUser()) as User;
      const { id } = await join_project(projectDetails.id, teacher.id);
      console.log(id);
      toast({
        description: "Your have joined.",
      });
      window.location.reload();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Join Failed",
        description: e.message,
      });
      setLoad(false);
      console.log(e);
      console.log(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{projectDetails?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-md font-semibold">Description</h3>
            <p>{projectDetails?.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-semibold">Student Name</h3>
              <div>
                <Avatar>
                  <AvatarImage alt="Mentor" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>
                    {student.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{student.name}</p>
                <p className="text-slate-500">{student.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-md font-semibold">Tech Stack</h3>
              <p>React, Next, Schadcn</p>
            </div>
          </div>
          {projectDetails?.mentor_id === null ? (
            <>
              <h3 className="text-md font-semibold">Want to contribute</h3>
              {load ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={() => {
                    on_join_project();
                  }}
                >
                  Join Prohect
                </Button>
              )}
            </>
          ) : (
            <>
              <h3 className="text-md font-semibold">Project Mentor</h3>
              <div className="grid gap-1">
                <Avatar>
                  <AvatarImage alt="Mentor" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>
                    {userMentor.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{userMentor.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userMentor.email}
                </p>
                <Button className="mt-2 w-1/3">Connect</Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

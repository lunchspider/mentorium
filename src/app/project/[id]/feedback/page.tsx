import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { get_project } from "@/actions/project";
import { get_mentor_of_project } from "@/actions/project";
import ViewProject from "@/components/ViewProject";
import { Project } from "@/db/schema";
import { User } from "@/db/schema";

export default async function Page({ params }: { params: { id: string } }) {
  const projectDetails = (await get_project(params.id)) as Project;
  const student = await get_mentor_of_project(projectDetails?.student_id || "");
  let userMentor: User = {} as User;
  if (projectDetails?.mentor_id !== null) {
    userMentor = (await get_mentor_of_project(
      projectDetails.mentor_id
    )) as User;
  }
  return (
    <div className="flex flex-col">
      {/* <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Mess Operations</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-2"
            href="#"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-2"
            href="#"
          >
            Place Order
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-2"
            href="#"
          >
            Calendar
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-2"
            href="#"
          >
            Feedback
          </Link>
        </nav>
      </header> */}
      <main className="flex flex-col sm:flow-row p-4 md:p-6 gap-4">
        <ViewProject
          projectDetails={projectDetails}
          student={student}
          userMentor={userMentor}
        />
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter the subject" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  className="min-h-[100px]"
                  id="message"
                  placeholder="Enter your message"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

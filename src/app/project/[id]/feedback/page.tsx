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

export default async function Page({ params }: { params: { id: string } }) {
  const projectDetails = await get_project(params.id);
  const student = await get_mentor_of_project(projectDetails?.student_id || "");
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
        <div className="flex justify-center flex-col items-center gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{projectDetails?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p>{projectDetails?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-md font-semibold">Student Name</h3>
                    <div>
                      <p>{student.name}</p>
                      <p className="text-slate-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Tech Stack</h3>
                    <p>React, Next, Schadcn</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="meal">Meal</Label>
                  <Select>
                    <SelectTrigger id="meal">
                      <div>Select a meal</div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="item">Item</Label>
                  <Select>
                    <SelectTrigger id="item">
                      <div>Select an item</div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oatmeal">Oatmeal</SelectItem>
                      <SelectItem value="toast">Toast</SelectItem>
                      <SelectItem value="eggs">Eggs</SelectItem>
                      <SelectItem value="cereal">Cereal</SelectItem>
                      <SelectItem value="sandwich">Sandwich</SelectItem>
                      <SelectItem value="salad">Salad</SelectItem>
                      <SelectItem value="soup">Soup</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="stew">Stew</SelectItem>
                      <SelectItem value="pasta">Pasta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" min="1" type="number" />
                </div>
                <Button type="submit">Place Order</Button>
              </form>
            </CardContent>
          </Card>
        </div>
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

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

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

export default function Page() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
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
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Current Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Breakfast</h3>
                  <p>Oatmeal, Toast, Eggs, Cereal</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Lunch</h3>
                  <p>Sandwich, Salad, Soup, Rice</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Dinner</h3>
                  <p>Stew, Pasta, Rice, Salad</p>
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

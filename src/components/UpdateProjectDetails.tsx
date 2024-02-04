"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { update_project } from "@/actions/project";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/db/schema";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Name must have 1 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must have 1 characters.",
  }),
  category: z.enum(["ideation", "progress", "completed"]),
});

export function UpdateProjectDetails({
  projectDetails,
}: {
  projectDetails: Project;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: projectDetails.id,
      name: projectDetails.name,
      description: projectDetails.description,
      category: "ideation",
    },
  });

  const on_submit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoad(true);
      const res = await update_project(values);
      console.log(res);
      setOpen(false);
      setLoad(false);
      router.push(`/project/${projectDetails.id}/description`);
    } catch (e: any) {
      setLoad(false);
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Update {projectDetails.name}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update your Project</DrawerTitle>
          <DrawerDescription>
            A project can be anything from a new product to a new feature.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col justify-center p-4">
          <Form {...form}>
            <form
              className="space-y-1 flex flex-col justify-center"
              onSubmit={form.handleSubmit(on_submit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={projectDetails.name} {...field} />
                    </FormControl>
                    <FormDescription>Enter your project name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={projectDetails.description}
                      />
                    </FormControl>
                    <FormDescription>Enter your description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={projectDetails.category} />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="ideation">Ideation</SelectItem>
                          <SelectItem value="progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Enter your description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {load ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Update Project</Button>
              )}
            </form>
          </Form>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

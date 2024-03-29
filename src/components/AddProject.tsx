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
import { useState, use } from "react";
import { create_project, get_tech_stacks } from "@/actions/project";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must have 1 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must have 1 characters.",
  }),
  category: z.enum(["ideation", "progress", "completed"]),

  tech_stacks: z.array(z.string()),
});

export function AddProject({ tech_stacks }: { tech_stacks: { id: string, name: string }[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "ideation",
      tech_stacks: [],
    },
  });

  const on_submit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { id } = await create_project(values);
      router.push(`/project/${id}/description`);
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add New</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add A Project</DrawerTitle>
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
                      <Input placeholder="Name" {...field} />
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
                        placeholder="Description of your project"
                      />
                    </FormControl>
                    <FormDescription>Enter your description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tech_stacks"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Tech Stacks</FormLabel>
                      <FormDescription>
                        Select the tech stacks you will be using in this project.
                      </FormDescription>
                    </div>
                    <div className = "flex flex-wrap gap-2">
                      {tech_stacks.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="tech_stacks"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
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
                          <SelectValue placeholder="Select" />
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


              <Button type="submit">Deploy</Button>
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

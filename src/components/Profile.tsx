"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useState } from "react";
import { User } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { update_user_details } from "@/actions/user";

const formSchema = z.object({
  id: z.string().min(1, {
    message: "Id must have 1 characters.",
  }),
  name: z.string().min(1, {
    message: "Name must have 1 characters.",
  }),
  email: z.string().min(1, {
    message: "Description must have 1 characters.",
  }),
});

export function Profile({ userdetails }: { userdetails: User }) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full ml-auto" size="icon" variant="ghost">
            <Image
              alt="Avatar"
              className="rounded-full border"
              height="32"
              src="/avatar.jpg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm userdetails={userdetails} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full ml-auto" size="icon" variant="ghost">
          <Image
            alt="Avatar"
            className="rounded-full border"
            height="32"
            src="/avatar.jpg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ProfileForm userdetails={userdetails} />
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

function ProfileForm({ userdetails }: { userdetails: User }) {
  const router = useRouter();
  const { toast } = useToast();

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userdetails.id,
      name: userdetails.name,
      email: userdetails.email,
    },
  });

  const on_submit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoad(true);
      const detail = await update_user_details(
        values.id,
        values.name,
        values.email
      );

      console.log(detail);
      toast({
        description: "Your info updated.",
      });
      setLoad(false);
      window.location.reload();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "update Failed",
        description: e.message,
      });
      setLoad(false);
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4")}
        onSubmit={form.handleSubmit(on_submit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={userdetails.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder={userdetails.email} />
              </FormControl>
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
          <Button type="submit">Save Changes</Button>
        )}
      </form>
    </Form>
  );
}

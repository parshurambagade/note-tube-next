import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

const NotesCard = () => {
  return (
    // TODO: Replace 1 with actual notes id
    <Link href={`/notes/1`}>
    <Card className="max-w-full md:max-w-72 py-0 gap-2 cursor-pointer">
      <CardHeader className="p-0">
        <Image
          src={
            "https://i.ytimg.com/vi/J11Qme3vAio/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCtGHpbHTLQqdDDHB65R0rw1BJ-bA"
          }
          width={200}
          height={120}
          alt="Notes Thumbnail"
          className="w-full rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="px-4 ">
        <h3 className="text-lg leading-6 font-[700] line-clamp-2">
          Major Tech Breakthrough Announced
        </h3>
      </CardContent>
      <CardFooter className="px-4 pb-4 ">
        <Badge variant={"secondary"}>2 hours ago</Badge>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default NotesCard;

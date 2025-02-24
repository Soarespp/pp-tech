"use client";
import { ListMenu } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="flex justify-center ">
      <ListMenu />
    </div>
  );
}

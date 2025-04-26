"use client";

import { Video } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="py-3 px-5 flex justify-between items-center shadow-sm shadow-muted/50">
      <Link href="/dashboard" className="flex gap-3 items-center">
        <Video className="w-8 h-8 rounded-md bg-primary text-primary-foreground p-1.5" />
        <h2 className="font-bold text-xl">Reels Magic Pro.</h2>
      </Link>
      <div className="flex gap-3 items-center">
        <Button onClick={() => signOut()} variant="destructive">
          Logout
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}

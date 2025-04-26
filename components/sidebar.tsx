"use client";

import {
  ChevronsUpDown,
  FileVideo,
  ListVideo,
  LucideIcon,
  PanelsTopLeft,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session?.user) return null;

  interface MenuOption {
    id: number;
    name: string;
    path: string;
    icon: LucideIcon;
  }
  const MenuOptions: MenuOption[] = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create",
      icon: FileVideo,
    },
    {
      id: 3,
      name: "My Videos",
      path: "/dashboard/videos",
      icon: ListVideo,
    },
  ];
  return (
    <div className="w-64 p-5 hidden md:flex flex-col">
      <div className="flex-1 flex flex-col justify-between">
        <div className="grid gap-3">
          {MenuOptions.map(({ id, name, path, icon: Icon }) => (
            <Link
              href={path}
              key={id}
              className={`flex items-center gap-2 p-2 hover:text-primary-foreground hover:bg-primary rounded-md transition-colors ${
                pathname === path && "bg-primary text-primary-foreground"
              }`}
            >
              <Icon />
              <h2>{name}</h2>
            </Link>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-2 cursor-pointer">
            <Image
              className="rounded-full w-8 h-8 border-2 border-primary"
              src={session?.user.image || "/user-avatar.svg"}
              alt="user-image"
              width={64}
              height={64}
              unoptimized
            />
            {session?.user.name}
            <ChevronsUpDown  className="size-4"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

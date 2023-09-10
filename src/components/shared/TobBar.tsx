import { Bell, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import SideBarBTN from "../buttons/SideBarBTN";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../buttons/ModeToggle";

function TopBar() {
  return (
    <nav className=" topbar">
      <div className="flex items-center justify-between w-full ">
        <Link href="/" className="flex items-center gap-4 ">
          <p className=" text-heading3-bold max-xs:hidden">BOBOBOARD</p>
        </Link>
        <SideBarBTN />
        <Input placeholder="search anything..." icon={<Search />} />

        {/** theme toggle */}
        <ModeToggle />

        <div className="flex items-center gap-3 sm:pr-64">
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/sdhadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Label>My Account</Label>
              <Separator />
              <div>
                <div>
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </div>

                <div>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </div>
              </div>

              <div>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;

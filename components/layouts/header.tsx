"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItem from "./nav-item";
import MobileNavItem from "./mobile-nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items
const navigationItems = [
  { name: "Home", href: "/" },
  { name: "All Notes", href: "/notes/all" },
];

export default function MainHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-white shadow-sm"
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-max">
            <span className="text-white font-bold text-lg">M</span>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-600">
              NoteTube
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-1 w-full">
            <div>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <NavItem key={item.name} href={item.href} isActive={isActive}>
                    {item.name}
                  </NavItem>
                );
              })}
            </div>
          </nav>
          {/* TODO: Add login button and conditionally render avatar and login button. */}
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center my-2 min-w-max">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* TODO: Replace with the actual name of the user*/}
                <p>John Doe</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* TODO: Add Logout logic  */}
                <DropdownMenuItem
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={() => console.log("click")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      console.log("click");
                    }
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden my-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 space-y-1 shadow-b-lg border-b-2">
            {/* Mobile Nav Links - Now with animated mobile nav items */}
            <div className="flex flex-col gap-2 items-center my-6">
              {/* TODO: Add login button and conditionally render avatar or button */}

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" width={200} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* TODO: Replace with the actual name of the user*/}
              <p>John Doe</p>
            </div>
            <div>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <MobileNavItem
                    key={item.name}
                    href={item.href}
                    isActive={isActive}
                  >
                    {item.name}
                  </MobileNavItem>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Settings, Menu, User } from 'lucide-react'
import { Katibeh } from 'next/font/google'
import Link from 'next/link';

const katibeh = Katibeh({
  subsets: ['latin'],
  weight: ['400'],
})

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItems = () => (
    <>
      <Link href="/zensphere">
        <Button variant="ghost" className="text-xl">Dashboard</Button>
      </Link>
      <Link href="/marketplace">
        <Button variant="ghost" className="text-xl">MarketPlace</Button>
      </Link>
      <Link href="/trade">
        <Button variant="ghost" className="text-xl">DeX</Button>
      </Link>
    </>
  );

  return (
    <nav className={`${katibeh.className} flex items-center justify-between p-4 bg-white border-b`}>
      <div className="flex items-center space-x-8 ml-4">
        <Link href="/zenchain">
          <h1 className="text-4xl font-bold pb-2">Zene</h1>
        </Link>
        <div className="hidden md:flex space-x-4">
          <NavItems />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="hidden md:flex items-center text-2xl space-x-2 border-black bg-white text-black hover:bg-neutral-100">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline">abcbcbcbcb</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Settings className="h-5 w-5" />
        </Button>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <NavItems />
              <Button variant="default" className=" w-2/3 mx-auto flex items-center text-2xl space-x-2 border-black bg-white text-black hover:bg-neutral-100">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">abcbcbcbcb</span>
              </Button>
             
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
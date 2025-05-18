'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bot, Sparkles } from 'lucide-react'; // Added Sparkles icon
import { useState } from 'react';
import React from 'react'; // Import React

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Try Now', href: '#try-now' },
  // { label: 'About', href: '#footer' }, // Optional: Add About link
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4"> {/* Increased height */}
        <Link href="/" className="mr-6 flex items-center space-x-2 group transition-transform duration-200 hover:scale-105">
          {/* <Bot className="h-7 w-7 text-primary group-hover:text-accent transition-colors" /> */}
           <Sparkles className="h-7 w-7 text-primary group-hover:text-accent transition-colors" /> {/* Use Sparkles */}
          <span className="font-bold text-lg text-primary group-hover:bg-gradient-text transition-all duration-300">AIAccelerate</span> {/* Bolder, larger, gradient on hover */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-foreground text-foreground/70" // Adjusted hover color
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           {/* Added hover animation to Get Started button */}
          <Button asChild className="hidden md:inline-flex bg-accent-gradient hover:bg-accent-gradient-hover text-accent-foreground transition-all duration-300 ease-out hover:scale-105 px-5 py-2" size="sm">
             <Link href="#try-now">Get Started</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" /> {/* Slightly larger icon */}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[260px] sm:w-[300px] bg-card"> {/* Use card background */}
              <Link
                href="/"
                className="flex items-center space-x-2 mb-8 pl-6 pt-4 transition-transform duration-200 hover:scale-105 group" // Added padding top
                onClick={() => setIsMobileMenuOpen(false)}
              >
                 <Sparkles className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                <span className="font-bold text-lg text-primary group-hover:bg-gradient-text transition-all duration-300">AIAccelerate</span>
              </Link>
              <div className="flex flex-col space-y-4 pl-6"> {/* Increased spacing */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base text-foreground/80 hover:text-foreground transition-colors duration-200" // Larger text
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                  {/* Added hover animation to mobile Get Started button */}
                 <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="w-fit mt-4 bg-accent-gradient hover:bg-accent-gradient-hover text-accent-foreground transition-all duration-300 ease-out hover:scale-105" variant="default" size="sm">
                   <Link href="#try-now">Get Started</Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

"use client";

import { Bell, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30 shadow-elegant">
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search shipments, carriers, and reports..."
              className="w-full appearance-none bg-background/50 pl-8 shadow-none md:w-2/3 lg:w-1/3 rounded-lg border border-border h-9 px-3 text-sm transition-all focus:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </form>
      </div>
      <ThemeToggle />
      <button className="h-8 w-8 rounded-full border border-border flex items-center justify-center bg-background hover:bg-accent transition-colors relative">
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive border-[1.5px] border-background" />
      </button>
      <button className="h-8 w-8 rounded-full border border-border flex items-center justify-center bg-primary text-primary-foreground">
        <User className="h-4 w-4" />
      </button>
    </header>
  );
}

"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ThemeProvider } from "next-themes";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 md:ml-64 w-full">
          <Header />
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

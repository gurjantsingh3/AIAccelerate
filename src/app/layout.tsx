import type {Metadata} from 'next';
import {GeistSans} from 'geist/font/sans'; // Correct import for Geist Sans
import {GeistMono} from 'geist/font/mono'; // Correct import for Geist Mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import Header from '@/components/layout/header'; // Import Header
import Footer from '@/components/layout/footer'; // Import Footer

export const metadata: Metadata = {
  title: 'AIAccelerate', // Update title
  description: 'AI-powered tools for resumes, documents, and job matching.', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added the 'dark' class here to enable dark mode by default
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12"> {/* Added more padding */}
         {children}
        </main>
        <Footer />
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}

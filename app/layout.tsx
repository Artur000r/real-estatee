import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Providers & Components
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import { ScrollProgress } from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "LuxEstate | Պրեմիում Անշարժ Գույք",
  description: "Ժամանակակից հարթակ անշարժ գույքի որոնման և վաճառքի համար",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hy" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased transition-colors duration-300`}
      >
        {/* 1. AuthProvider-ը պետք է լինի ամենավերևում, որպեսզի բոլորը հասանելիություն ունենան օգտատիրոջ տվյալներին */}
        <AuthProvider>
          <ThemeProvider>
            
            {/* Էջի վերևի scroll progress գիծը */}
            <ScrollProgress />

            {/* Նավիգացիոն մենյուն (այն արդեն կարող է օգտագործել useAuth() հուկը) */}
            <Navbar />
            
            {/* Հիմնական բովանդակությունը */}
            <div className="relative flex flex-col min-h-screen">
              {children}
            </div>

            {/* AI Օգնականի widget-ը */}
            <ChatWidget />
            
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
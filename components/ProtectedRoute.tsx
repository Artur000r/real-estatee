"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Եթե բեռնումն ավարտվել է և օգտատեր չկա
    if (!loading && !user) {
      console.log("Access denied. Redirecting to login...");
      // Համոզվում ենք, որ չենք փորձում վերահասցեագրել, եթե արդեն լոգինի էջում ենք
      if (pathname !== "/login") {
        router.replace("/login"); 
      }
    }
  }, [user, loading, router, pathname]);

  // Մինչև բեռնվում է կամ եթե օգտատեր չկա, ցույց ենք տալիս սպասման էկրան
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-500 animate-pulse text-sm font-medium">Ստուգվում է հասանելիությունը...</p>
      </div>
    );
  }

  return <>{children}</>;
}
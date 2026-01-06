"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Հեռացրինք խնդրահարույց import-ը և օգտագործում ենք ComponentProps
import { type ComponentProps } from "react";

export function ThemeProvider({ 
  children, 
  ...props 
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
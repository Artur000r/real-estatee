"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  Heart, 
  User, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X, 
  Building2,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Փոխում ենք Navbar-ի տեսքը սքրոլ անելիս
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Փակել մենյուն էջը փոխելիս
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Գլխավոր", href: "/" },
    { name: "Բոլորը", href: "/listings" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled 
      ? "py-3 bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-white/10" 
      : "py-5 bg-transparent"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-xl text-white transition-transform group-hover:rotate-12">
              <Building2 size={24} />
            </div>
            <span className={`text-2xl font-black tracking-tighter ${
              scrolled ? "text-foreground" : "text-white sm:text-foreground"
            }`}>
              Estate<span className="text-blue-600">Armenia</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 font-bold text-sm uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`transition-colors hover:text-blue-600 ${
                    pathname === link.href ? "text-blue-600" : scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-white/10" />

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/favorites" className={`p-2 rounded-full transition-colors ${
                    pathname === "/favorites" ? "text-red-500 bg-red-50" : scrolled ? "text-foreground hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}>
                    <Heart size={22} fill={pathname === "/favorites" ? "currentColor" : "none"} />
                  </Link>
                  
                  <Link href="/dashboard" className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                    pathname === "/dashboard" ? "bg-blue-600 text-white" : scrolled ? "hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}>
                    <User size={20} />
                    <span>Իմ էջը</span>
                  </Link>

                  <Link href="/add-property" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                    <PlusCircle size={20} />
                    <span>Ավելացնել</span>
                  </Link>

                  <button onClick={() => signOut()} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={22} />
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all">
                  Մուտք
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-xl ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-4 font-black text-xl">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  {link.name} <ChevronRight size={20} className="text-blue-600" />
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link href="/favorites" className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-red-500">
                    Սիրելիներ <Heart size={20} fill="currentColor" />
                  </Link>
                  <Link href="/dashboard" className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    Իմ հայտարարությունները <User size={20} />
                  </Link>
                  <Link href="/add-property" className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-2xl">
                    Ավելացնել տուն <PlusCircle size={20} />
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center justify-between p-4 text-gray-400">
                    Դուրս գալ <LogOut size={20} />
                  </button>
                </>
              ) : (
                <Link href="/login" className="w-full py-5 bg-blue-600 text-white rounded-3xl text-center">
                  Մուտք գործել
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
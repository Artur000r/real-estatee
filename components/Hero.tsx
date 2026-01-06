"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Building2, Trees, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Կատեգորիաների ցանկը
const HERO_CATEGORIES = [
  { name: "Առանձնատուն", icon: Home, value: "Առանձնատուն" },
  { name: "Բնակարան", icon: Building2, value: "Բնակարան" },
  { name: "Հողատարածք", icon: Trees, value: "Հողատարածք" },
  { name: "Կոմերցիոն", icon: Briefcase, value: "Կոմերցիոն" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = query.trim() ? `/listings?search=${encodeURIComponent(query)}` : "/listings";
    router.push(url);
  };

  // Ֆունկցիա՝ կատեգորիայով անմիջապես ֆիլտրելու համար
  const handleCategoryClick = (category: string) => {
    router.push(`/listings?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Modern House"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Գտեք Ձեր <span className="text-blue-500">Կատարյալ</span> Տունը
          </h1>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-[30px] md:rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-4 px-6 w-full">
              <Search className="text-blue-600" size={24} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Որոնել ըստ հասցեի կամ թաղամասի..."
                className="w-full py-4 bg-transparent outline-none text-lg text-black"
              />
            </div>
            <button type="submit" className="w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-[24px] md:rounded-[32px] font-black hover:bg-blue-700 transition-all">
              Որոնել
            </button>
          </form>
        </div>

        {/* Կատեգորիաների կոճակներ (Buttons) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {HERO_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <div className="p-2 bg-white/10 group-hover:bg-blue-600/10 rounded-xl transition-colors">
                  <Icon size={20} className="group-hover:text-blue-600" />
                </div>
                {cat.name}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
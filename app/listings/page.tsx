"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { Loader2, SearchX, LayoutGrid, Home, Building2, Trees } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Բոլորը", icon: LayoutGrid, value: "All" },
  { name: "Առանձնատուն", icon: Home, value: "Առանձնատուն" },
  { name: "Բնակարան", icon: Building2, value: "Բնակարան" },
  { name: "Հողատարածք", icon: Trees, value: "Հողատարածք" },
];

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      
      let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      // 1. Որոնման ֆիլտր
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`);
      }

      // 2. Կատեգորիայի ֆիլտր
      if (selectedCategory !== "All") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) console.error(error.message);
      else setProperties(data || []);
      
      setLoading(false);
    }

    fetchProperties();
  }, [searchQuery, selectedCategory]);

  const updateFilters = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") params.delete("category");
    else params.set("category", category);
    
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="container mx-auto">
        
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-6 tracking-tight">
            {searchQuery ? `Արդյունքներ "${searchQuery}"-ի համար` : "Գտեք Ձեր նախընտրած գույքը"}
          </h1>

          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-4 items-center">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => updateFilters(cat.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border ${
                    isActive 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105" 
                    : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-blue-300"
                  }`}
                >
                  <Icon size={18} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-gray-500">Թարմացվում է ցանկը...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 dark:bg-white/5 rounded-[50px] border border-dashed border-gray-200 dark:border-white/10">
            <SearchX size={60} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-xl font-bold text-gray-400">Համապատասխան գույք չի գտնվել</h3>
            <button 
              onClick={() => updateFilters("All")}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg"
            >
              Տեսնել բոլորը
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {properties.map((item) => (
              <PropertyCard 
                key={item.id} 
                id={item.id}
                title={item.title}
                price={item.price}
                address={item.address}
                beds={Number(item.beds)}
                baths={Number(item.baths)}
                sqft={Number(item.sqft)}
                image={item.image_url} 
                category={item.category}
              />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
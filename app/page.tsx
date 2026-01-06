"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Ստուգիր, որ այս ֆայլերը իրականում գոյություն ունեն components թղթապանակում
import Stats from "@/components/Stats";
import Features from "../components/Features";
import Reviews from "../components/Reviews";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopProperties() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(6)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopProperties();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      {/* Եթե Stats.tsx-ը դեռ չես սարքել, ժամանակավորապես քոմենթ արա սա */}
      <Stats />

      <section className="py-24 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs mb-3">
              <Sparkles size={16} />
              <span>Թարմ Առաջարկներ</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Վերջին <span className="text-blue-600">Հայտարարությունները</span>
            </h2>
          </motion.div>
          
          <a href="/listings" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">
            Տեսնել բոլորը
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[40px]">
            <p className="text-gray-500">Հայտարարություններ չկան:</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
          </div>
        )}
      </section>

      <Features />
      <Reviews />
    </main>
  );
}
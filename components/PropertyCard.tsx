"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ id, title, price, address, beds, baths, sqft, image, category }: any) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  // Ստուգում ենք՝ արդյոք այս տունը արդեն սիրվածների մեջ է
  useEffect(() => {
    if (user) {
      const checkFavorite = async () => {
        const { data } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_id", user.id)
          .eq("property_id", id)
          .single();
        if (data) setIsLiked(true);
      };
      checkFavorite();
    }
  }, [user, id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return alert("Խնդրում ենք մուտք գործել");

    if (isLiked) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", id);
      setIsLiked(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, property_id: id });
      setIsLiked(true);
    }
  };

  return (
    <div className="relative group bg-white dark:bg-white/5 rounded-[40px] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500">
      <Link href={`/listings/${id}`} className="block relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
        
        {/* Սիրտ կոճակ */}
        <button onClick={toggleFavorite} className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
          <Heart fill={isLiked ? "#ef4444" : "none"} color={isLiked ? "#ef4444" : "white"} size={24} />
        </button>
      </Link>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 line-clamp-1">{title}</h3>
        <p className="text-blue-600 font-black text-2xl mb-4">{price}</p>
        <div className="flex justify-between text-gray-400 text-sm border-t pt-4 border-gray-100 dark:border-white/5">
           <span className="flex items-center gap-1"><Bed size={16}/> {beds}</span>
           <span className="flex items-center gap-1"><Bath size={16}/> {baths}</span>
           <span className="flex items-center gap-1"><Maximize size={16}/> {sqft} մ²</span>
        </div>
      </div>
    </div>
  );
}
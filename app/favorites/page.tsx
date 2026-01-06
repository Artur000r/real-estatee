"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "@/components/PropertyCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          property_id,
          properties (*)
        `)
        .eq("user_id", user.id);

      if (!error) {
        setFavorites(data.map(f => f.properties));
      }
      setLoading(false);
    }
    fetchFavorites();
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-32 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-black mb-12 text-center">Սիրված Գույքեր</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map(prop => (
              <PropertyCard key={prop.id} {...prop} image={prop.image_url} />
            ))}
          </div>
          {!loading && favorites.length === 0 && <p className="text-center text-gray-500">Դեռ ոչինչ չեք սիրել:</p>}
        </div>
      </main>
    </ProtectedRoute>
  );
}
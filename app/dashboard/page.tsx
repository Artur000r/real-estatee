"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "@/components/PropertyCard";
import { Loader2, Trash2, Plus, Home } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchMyProperties();
  }, [user]);

  async function fetchMyProperties() {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("user_id", user?.id) // Ֆիլտրում ենք ըստ օգտատիրոջ
      .order("created_at", { ascending: false });

    if (!error) setMyProperties(data || []);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Վստա՞հ եք, որ ուզում եք ջնջել այս հայտարարությունը:")) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) alert("Սխալ ջնջելիս: " + error.message);
    else fetchMyProperties(); // Թարմացնում ենք ցանկը
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black mb-2">Իմ Հայտարարությունները</h1>
              <p className="text-gray-500 italic">Կառավարեք Ձեր կողմից տեղադրված գույքերը</p>
            </div>
            <Link 
              href="/add-property" 
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus size={20} /> Ավելացնել Նորը
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : myProperties.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[40px] border border-dashed border-gray-200 dark:border-white/10">
              <Home size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Դուք դեռ չունեք տեղադրված հայտարարություններ:</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProperties.map((item) => (
                <div key={item.id} className="relative group">
                  <PropertyCard 
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    address={item.address}
                    beds={item.beds}
                    baths={item.baths}
                    sqft={item.sqft}
                    image={item.image_url}
                    category={item.category}
                  />
                  {/* Delete Button Overlay */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                    title="Ջնջել"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
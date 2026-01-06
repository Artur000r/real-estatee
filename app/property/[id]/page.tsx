"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Save, MapPin, Loader2, Home, 
  DollarSign, Maximize, Bed, Bath, Tag, ArrowLeft 
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditProperty() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Առանձնատուն",
    address: "",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
  });

  // Բեռնում ենք հին տվյալները
  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Գույքը չի գտնվել");
        router.push("/dashboard");
        return;
      }

      // Ստուգում ենք՝ արդյոք սա հենց այս օգտատիրոջ տունն է
      if (data.user_id !== user?.id) {
        alert("Դուք չունեք թույլտվություն");
        router.push("/dashboard");
        return;
      }

      setFormData({
        title: data.title,
        price: data.price.replace(/[$,]/g, ""), // Մաքրում ենք $ նշանը խմբագրելու համար
        category: data.category,
        address: data.address,
        beds: data.beds.toString(),
        baths: data.baths.toString(),
        sqft: data.sqft.toString(),
        description: data.description,
      });
      setLoading(false);
    }

    if (user && id) fetchProperty();
  }, [id, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("properties")
        .update({
          title: formData.title,
          price: `$${Number(formData.price).toLocaleString()}`,
          address: formData.address,
          category: formData.category,
          beds: parseInt(formData.beds) || 0,
          baths: parseInt(formData.baths) || 0,
          sqft: parseInt(formData.sqft) || 0,
          description: formData.description,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Փոփոխությունները պահպանվեցին");
      router.push("/dashboard");
    } catch (err: any) {
      alert("Սխալ: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-black transition-colors">
            <ArrowLeft size={20} /> Վերադառնալ
          </button>

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl font-black mb-8">Խմբագրել Հայտարարությունը</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 ml-2">Վերնագիր</label>
                <input name="title" value={formData.title} onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-2 ring-blue-500" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2">Գին ($)</label>
                  <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-2 ring-blue-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2">Կատեգորիա</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-2 ring-blue-500 font-bold">
                    <option value="Առանձնատուն">Առանձնատուն</option>
                    <option value="Բնակարան">Բնակարան</option>
                    <option value="Հողատարածք">Հողատարածք</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 ml-2">Հասցե</label>
                <input name="address" value={formData.address} onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-2 ring-blue-500" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input name="beds" type="number" value={formData.beds} onChange={handleChange} placeholder="Ննջ." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none" />
                <input name="baths" type="number" value={formData.baths} onChange={handleChange} placeholder="Սանհ." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none" />
                <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} placeholder="մ²" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 ml-2">Նկարագրություն</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-2 ring-blue-500 min-h-[150px]" />
              </div>

              <button disabled={saving} type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Պահպանել Փոփոխությունները</>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Home, MapPin, Loader2, 
  ChevronRight, ChevronLeft, Image as ImageIcon,
  DollarSign, Maximize, Bed, Bath, Tag
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddProperty() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 1. Սա այն formData-ն է, որտեղ հավաքվում է ողջ ինֆորմացիան
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Առանձնատուն", // Լռելյայն արժեք
    address: "",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handlePublish = async () => {
    if (imageFiles.length === 0) return alert("Խնդրում ենք ավելացնել գոնե մեկ նկար");
    if (!formData.title || !formData.price || !formData.address) return alert("Լրացրեք հիմնական դաշտերը");

    setLoading(true);
    try {
      // Նկարների վերբեռնում
      const uploadPromises = imageFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('properties')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Տվյալների պահպանում բազայում
      const { error: dbError } = await supabase
        .from('properties')
        .insert([
          { 
            title: formData.title, 
            price: `$${Number(formData.price).toLocaleString()}`, 
            address: formData.address, 
            category: formData.category, // Այստեղից է վերցնում ընտրված կատեգորիան
            beds: parseInt(formData.beds) || 0, 
            baths: parseInt(formData.baths) || 0, 
            sqft: parseInt(formData.sqft) || 0,
            description: formData.description,
            image_url: uploadedUrls[0], 
            images: uploadedUrls,
            user_id: user?.id 
          }
        ]);

      if (dbError) throw dbError;

      alert("Հայտարարությունը հաջողությամբ տեղադրվեց");
      router.push("/listings"); 
    } catch (err: any) {
      alert("Սխալ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-32 pb-20 bg-background transition-colors">
        <div className="container mx-auto px-6 max-w-3xl">
          
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
            {/* Պրոգրես Բար */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? "bg-blue-600" : "bg-gray-100 dark:bg-white/10"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3"><Home className="text-blue-600" /> Հիմնական</h2>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-2">Վերնագիր</label>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Օրինակ՝ Շքեղ առանձնատուն Արաբկիրում" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-2">Գին ($)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="50,000" className="w-full p-5 pl-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-2">Կատեգորիա</label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-5 pl-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500 appearance-none font-bold">
                          <option value="Առանձնատուն">Առանձնատուն</option>
                          <option value="Բնակարան">Բնակարան</option>
                          <option value="Հողատարածք">Հողատարածք</option>
                          <option value="Կոմերցիոն">Կոմերցիոն</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3"><MapPin className="text-blue-600" /> Մանրամասներ</h2>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-2">Հասցե</label>
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Օրինակ՝ Կոմիտաս 45, Երևան" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-2">Ննջարան</label>
                      <div className="relative">
                        <Bed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input name="beds" type="number" value={formData.beds} onChange={handleChange} placeholder="2" className="w-full p-5 pl-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-2">Սանհանգույց</label>
                      <div className="relative">
                        <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input name="baths" type="number" value={formData.baths} onChange={handleChange} placeholder="1" className="w-full p-5 pl-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-2">Մակերես մ²</label>
                      <div className="relative">
                        <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} placeholder="85" className="w-full p-5 pl-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3"><Camera className="text-blue-600" /> Նկարներ և Նկարագիր</h2>
                  
                  <input type="file" id="img" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="img" className="block p-12 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[32px] cursor-pointer hover:border-blue-500 transition-all text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-lg font-bold">Ընտրեք նկարները</p>
                    <p className="text-sm text-gray-500 mt-1">{imageFiles.length > 0 ? `Ընտրված է ${imageFiles.length} նկար` : "Կարող եք ընտրել մի քանի նկար"}</p>
                  </label>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-2">Լրացուցիչ տեղեկություն</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Գրեք մանրամասն գույքի մասին..." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border-none outline-none focus:ring-2 ring-blue-500 min-h-[150px] resize-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Նավիգացիա */}
            <div className="mt-12 flex justify-between gap-4">
              <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${step === 1 ? "opacity-0 invisible" : "bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200"}`}>
                Հետ
              </button>
              
              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  Հաջորդը <ChevronRight size={20} />
                </button>
              ) : (
                <button onClick={handlePublish} disabled={loading} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : "Հրապարակել"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
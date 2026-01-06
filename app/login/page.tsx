"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isRegistering) {
      // Գրանցում
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setError(error.message);
      else alert("Հաշիվը ստեղծված է: Ստուգեք Ձեր մայլը միայն առաջին անգամ հաստատելու համար:");
    } else {
      // Մուտք գաղտնաբառով
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError("Սխալ էլ. հասցե կամ գաղտնաբառ");
      else router.push("/");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          {isRegistering ? "Գրանցվել" : "Բարի գալուստ"}
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {isRegistering ? "Ստեղծեք Ձեր հաշիվը հիմա" : "Մուտք գործեք գաղտնաբառով"}
        </p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="email" 
            placeholder="Էլ. հասցե" 
            required
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Գաղտնաբառ" 
            required
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
          >
            {loading ? "Մշակվում է..." : isRegistering ? "Գրանցվել" : "Մուտք"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}

        <div className="mt-6 text-center text-sm">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Արդեն ունե՞ք հաշիվ: Մուտք գործել" : "Չունե՞ք հաշիվ: Գրանցվել"}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
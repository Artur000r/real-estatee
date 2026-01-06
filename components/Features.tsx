"use client";
import { ShieldCheck, Zap, Headphones, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { 
    title: "Անվտանգ Գործարք", 
    desc: "Մենք երաշխավորում ենք յուրաքանչյուր գործարքի իրավաբանական մաքրությունը:", 
    icon: ShieldCheck 
  },
  { 
    title: "Արագ Արձագանք", 
    desc: "Մեր գործակալները կապի մեջ են 24/7 և պատրաստ են օգնել Ձեզ:", 
    icon: Zap 
  },
  { 
    title: "Մասնագիտական Խորհուրդ", 
    desc: "Անվճար խորհրդատվություն շուկայի լավագույն մասնագետների կողմից:", 
    icon: Headphones 
  },
  { 
    title: "Շուկայի Վերլուծություն", 
    desc: "Մենք տրամադրում ենք ամենաթարմ տվյալները գների փոփոխության մասին:", 
    icon: BarChart3 
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white dark:bg-black/20 rounded-[32px] border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
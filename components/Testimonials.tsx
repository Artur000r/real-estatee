"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "Արմեն Գրիգորյան", role: "Գնորդ", text: "Լավագույն փորձառությունը, որ երբևէ ունեցել եմ անշարժ գույքի շուկայում: Ամեն ինչ արագ է և թափանցիկ:" },
  { name: "Անի Սարգսյան", role: "Վարձակալ", text: "Կայքի դիզայնը և ֆունկցիոնալությունը պարզապես հիանալի են: Գտա իմ բնակարանը ընդամենը 2 օրում:" },
  { name: "Կարեն Դավթյան", role: "Կառուցապատող", text: "Որպես գործընկեր՝ կարող եմ ասել, որ սա ամենաժամանակակից հարթակն է Հայաստանում:" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Ինչ են ասում մեր հաճախորդները</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 relative"
            >
              <Quote className="text-blue-500 mb-4 opacity-50" size={40} />
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"{rev.text}"</p>
              <div>
                <h4 className="text-white font-bold">{rev.name}</h4>
                <p className="text-gray-500 text-sm">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
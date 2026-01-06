"use client";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    { name: "Արմեն Սարգսյան", text: "Լավագույն հարթակը տուն գտնելու համար: Ամեն ինչ շատ արագ ստացվեց:", role: "Գնորդ" },
    { name: "Անի Կարապետյան", text: "Շատ հարմար ինտերֆեյս և պրոֆեսիոնալ մոտեցում: Շնորհակալություն:", role: "Վաճառող" },
  ];

  return (
    <section className="py-24 px-6 container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Ինչ են ասում մեր հաճախորդները</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="p-10 bg-white dark:bg-white/5 rounded-[40px] border border-gray-100 dark:border-white/10">
            <div className="flex gap-1 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-lg italic mb-6 text-gray-600 dark:text-gray-300">"{r.text}"</p>
            <div className="font-bold">{r.name}</div>
            <div className="text-sm text-blue-500">{r.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
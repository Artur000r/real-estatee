"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Ինֆորմացիա */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-5xl font-bold text-white mb-8">Կապվեք մեզ հետ</h2>
            <p className="text-gray-400 text-lg mb-12">Ունե՞ք հարցեր: Մեր թիմը պատրաստ է օգնել ձեզ գտնել լավագույն լուծումը:</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                  <Phone size={24} />
                </div>
                <span>+374 (00) 00-00-00</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                  <Mail size={24} />
                </div>
                <span>info@luxestate.am</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500">
                  <MapPin size={24} />
                </div>
                <span>Երևան, Հյուսիսային Պողոտա</span>
              </div>
            </div>
          </motion.div>

          {/* Ֆորմա */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Անուն" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all" />
              <input type="email" placeholder="Էլ. փոստ" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all" />
            </div>
            <input type="text" placeholder="Թեմա" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all" />
            <textarea placeholder="Ձեր հաղորդագրությունը" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"></textarea>
            
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              <Send size={20} />
              Ուղարկել
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
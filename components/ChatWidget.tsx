"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            className="mb-4 w-80 h-[450px] bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 bg-blue-600 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-bold">AI Օգնական</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:rotate-90 transition-transform p-1"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto text-sm space-y-4 bg-gray-50 dark:bg-transparent">
              <div className="bg-white dark:bg-white/5 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200">
                Բարև ձեզ! Ես LUXESTATE-ի AI օգնականն եմ: Ինչպե՞ս կարող եմ օգնել ձեզ գտնել կատարյալ բնակարանը:
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-transparent flex gap-2">
              <input 
                className="flex-1 bg-gray-100 dark:bg-white/5 p-3 rounded-xl outline-none text-sm text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="Գրեք ձեր հարցը..." 
              />
              <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
                <Send size={18}/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/40 transition-shadow"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </motion.button>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-off-white border-b-4 border-deep-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-mauve p-3 rounded-brutal border-3 border-deep-black shadow-brutal"
          >
            <Utensils size={32} strokeWidth={2.5} />
          </motion.div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-mauve leading-none">
              Recipe Planner
            </h1>
            <p className="text-sm font-medium text-deep-black/60 mt-1">
              Planifiez vos repas de la semaine avec l'IA
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

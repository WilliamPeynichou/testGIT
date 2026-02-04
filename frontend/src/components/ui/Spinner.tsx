import { motion } from 'framer-motion';

export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-deep-black border-t-mauve border-r-dark-orange rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-bold text-lg text-deep-black"
      >
        Génération des recettes en cours...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="text-sm text-deep-black/60"
      >
        Notre chef IA prépare vos menus
      </motion.p>
    </div>
  );
}

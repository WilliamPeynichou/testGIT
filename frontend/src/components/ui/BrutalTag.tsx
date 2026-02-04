import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrutalTagProps {
  label: string;
  onRemove: () => void;
}

export function BrutalTag({ label, onRemove }: BrutalTagProps) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className="tag-brutal"
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
        aria-label={`Retirer ${label}`}
      >
        <X size={14} strokeWidth={3} />
      </button>
    </motion.span>
  );
}

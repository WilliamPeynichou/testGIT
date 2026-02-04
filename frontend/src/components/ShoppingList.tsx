import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { BrutalButton } from './ui/BrutalButton';
import type { ShoppingListResponse, ShoppingCategory } from '@shared/index';
import { SHOPPING_CATEGORY_LABELS } from '@shared/index';

interface ShoppingListProps {
  shoppingList: ShoppingListResponse;
  onClose: () => void;
}

const categoryEmojis: Record<ShoppingCategory, string> = {
  'fruits-legumes': '🥕',
  'viandes-poissons': '🥩',
  'produits-laitiers': '🧀',
  'epicerie': '🫘',
  'boulangerie': '🥖',
  'surgeles': '🧊',
  'boissons': '🥤',
  'condiments': '🧂',
  'autre': '📦',
};

export function ShoppingList({ shoppingList, onClose }: ShoppingListProps) {
  const nonEmptyCategories = (Object.entries(shoppingList.categories) as [ShoppingCategory, typeof shoppingList.categories[ShoppingCategory]][])
    .filter(([, items]) => items.length > 0);

  const handleDownload = () => {
    let text = '🛒 LISTE DE COURSES\n';
    text += '='.repeat(40) + '\n\n';

    for (const [cat, items] of nonEmptyCategories) {
      text += `${categoryEmojis[cat]} ${SHOPPING_CATEGORY_LABELS[cat]}\n`;
      text += '-'.repeat(30) + '\n';
      for (const item of items) {
        text += `  • ${item.name}: ${item.totalQuantity} ${item.unit}\n`;
      }
      text += '\n';
    }

    text += `\n💰 Prix total estimé: ${shoppingList.totalEstimatedPrice.toFixed(2)}€\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'liste-de-courses.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-deep-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-off-white border-4 border-deep-black rounded-brutal shadow-brutal-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-mauve px-6 py-4 border-b-4 border-deep-black flex items-center justify-between">
            <h2 className="text-2xl font-bold">Liste de courses</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-brutal border-3 border-deep-black bg-off-white flex items-center justify-center hover:bg-pale-yellow transition-colors shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-brutal-active"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {nonEmptyCategories.map(([cat, items], catIndex) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.05 }}
              >
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 border-b-2 border-deep-black/20 pb-2">
                  <span className="text-xl">{categoryEmojis[cat]}</span>
                  {SHOPPING_CATEGORY_LABELS[cat]}
                  <span className="ml-auto text-sm font-medium text-deep-black/50">
                    {items.length} article{items.length > 1 ? 's' : ''}
                  </span>
                </h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center py-1.5 px-3 rounded-lg hover:bg-pale-yellow/50 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="font-mono text-sm bg-pale-yellow border-2 border-deep-black rounded-full px-3 py-0.5">
                        {item.totalQuantity} {item.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t-4 border-deep-black bg-pale-yellow flex items-center justify-between">
            <div className="font-bold text-lg">
              Total estimé :{' '}
              <span className="text-dark-orange text-2xl">
                {shoppingList.totalEstimatedPrice.toFixed(2)}€
              </span>
            </div>
            <BrutalButton variant="orange" size="sm" onClick={handleDownload}>
              <span className="flex items-center gap-2">
                <Download size={16} strokeWidth={3} />
                Télécharger
              </span>
            </BrutalButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

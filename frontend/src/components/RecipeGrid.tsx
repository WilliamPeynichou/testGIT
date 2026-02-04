import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShoppingCart } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { BrutalButton } from './ui/BrutalButton';
import type { Recipe } from '@shared/index';

interface RecipeGridProps {
  recipes: Recipe[];
  onRegenerateOne: (index: number) => void;
  onRegenerateAll: () => void;
  onExportShoppingList: () => void;
  regeneratingIndex: number | null;
  isRegeneratingAll: boolean;
  isExporting: boolean;
}

export function RecipeGrid({
  recipes,
  onRegenerateOne,
  onRegenerateAll,
  onExportShoppingList,
  regeneratingIndex,
  isRegeneratingAll,
  isExporting,
}: RecipeGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Determine grid columns based on recipe count
  const getGridClass = () => {
    const count = recipes.length;
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
    if (count <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <motion.div
      ref={gridRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold text-deep-black">
          Vos {recipes.length} recettes
        </h2>
        <div className="flex flex-wrap gap-3">
          <BrutalButton
            variant="mauve"
            size="md"
            onClick={onRegenerateAll}
            isLoading={isRegeneratingAll}
          >
            <span className="flex items-center gap-2">
              <RefreshCw size={18} strokeWidth={3} />
              Tout regénérer
            </span>
          </BrutalButton>

          <BrutalButton
            variant="orange"
            size="md"
            onClick={onExportShoppingList}
            isLoading={isExporting}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} strokeWidth={3} />
              Liste de courses
            </span>
          </BrutalButton>
        </div>
      </div>

      {/* Recipe grid with asymmetric offsets */}
      <div className={`grid ${getGridClass()} gap-6`}>
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id || index}
            className={index % 3 === 1 ? 'md:mt-6' : index % 3 === 2 ? 'md:mt-3' : ''}
          >
            <RecipeCard
              recipe={recipe}
              index={index}
              onRegenerate={onRegenerateOne}
              isRegenerating={regeneratingIndex === index}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

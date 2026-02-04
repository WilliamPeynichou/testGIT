import { motion } from 'framer-motion';
import { Clock, RefreshCw, Euro } from 'lucide-react';
import { BrutalBadge } from './ui/BrutalBadge';
import { BrutalButton } from './ui/BrutalButton';
import type { Recipe, RecipeCategory } from '@shared/index';
import { CATEGORY_LABELS, CATEGORY_BUDGET } from '@shared/index';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  onRegenerate: (index: number) => void;
  isRegenerating: boolean;
}

const categoryHeaderColors: Record<RecipeCategory, string> = {
  economique: 'bg-mauve',
  gourmand: 'bg-dark-orange text-white',
  plaisir: 'bg-pale-yellow',
};

const categoryBadgeVariant: Record<RecipeCategory, 'mauve' | 'orange' | 'yellow'> = {
  economique: 'mauve',
  gourmand: 'orange',
  plaisir: 'yellow',
};

export function RecipeCard({ recipe, index, onRegenerate, isRegenerating }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="card-brutal overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div
        className={`px-5 py-4 border-b-4 border-deep-black ${categoryHeaderColors[recipe.category]}`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg leading-tight">{recipe.name}</h3>
          <BrutalBadge variant={categoryBadgeVariant[recipe.category]}>
            {CATEGORY_LABELS[recipe.category]}
          </BrutalBadge>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm font-medium">
          <span className="flex items-center gap-1">
            <Clock size={16} strokeWidth={3} />
            {recipe.preparationTime} min
          </span>
          <span className="flex items-center gap-1">
            <Euro size={16} strokeWidth={3} />
            {recipe.pricePerPerson.toFixed(2)}€/pers.
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        {/* Ingredients */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-mauve border-2 border-deep-black flex items-center justify-center text-xs">
              i
            </span>
            Ingrédients
          </h4>
          <ul className="space-y-1.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="font-medium">{ing.name}</span>
                <span className="text-deep-black/60 font-mono text-xs">
                  {ing.quantity} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wide mb-3">Préparation</h4>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-orange text-white border-2 border-deep-black flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Nutrition */}
        <div className="grid grid-cols-5 gap-2 mt-auto">
          {[
            { label: 'Cal', value: recipe.nutrition.calories, unit: '' },
            { label: 'Prot', value: recipe.nutrition.proteins, unit: 'g' },
            { label: 'Gluc', value: recipe.nutrition.carbs, unit: 'g' },
            { label: 'Lip', value: recipe.nutrition.fats, unit: 'g' },
            { label: 'Fib', value: recipe.nutrition.fiber, unit: 'g' },
          ].map((n) => (
            <div
              key={n.label}
              className="text-center p-2 bg-pale-yellow border-2 border-deep-black rounded-lg"
            >
              <div className="font-bold text-xs">{n.value}{n.unit}</div>
              <div className="text-[10px] uppercase font-medium opacity-60">{n.label}</div>
            </div>
          ))}
        </div>

        {/* Regenerate Button */}
        <BrutalButton
          variant="mauve"
          size="sm"
          onClick={() => onRegenerate(index)}
          isLoading={isRegenerating}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            <RefreshCw size={16} strokeWidth={3} />
            Regénérer cette recette
          </span>
        </BrutalButton>
      </div>
    </motion.div>
  );
}

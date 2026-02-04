import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Users, Utensils } from 'lucide-react';
import { BrutalButton } from './ui/BrutalButton';
import { BrutalSlider } from './ui/BrutalSlider';
import { ExclusionTags } from './ExclusionTags';
import type { GenerateRecipesRequest, CategoryDistribution } from '@shared/index';

interface MealSelectorProps {
  onGenerate: (request: GenerateRecipesRequest) => void;
  isLoading: boolean;
}

export function MealSelector({ onGenerate, isLoading }: MealSelectorProps) {
  const [mealsCount, setMealsCount] = useState(7);
  const [personsCount, setPersonsCount] = useState(2);
  const [categories, setCategories] = useState<CategoryDistribution>({
    economique: 3,
    gourmand: 3,
    plaisir: 1,
  });
  const [excludedTags, setExcludedTags] = useState<string[]>([]);

  const totalCategories = categories.economique + categories.gourmand + categories.plaisir;
  const isValid = totalCategories === mealsCount;

  // Auto-adjust categories when meals count changes
  useEffect(() => {
    const eco = Math.ceil(mealsCount * 0.4);
    const gour = Math.ceil(mealsCount * 0.4);
    const plai = mealsCount - eco - gour;
    setCategories({
      economique: Math.max(0, eco),
      gourmand: Math.max(0, gour),
      plaisir: Math.max(0, plai),
    });
  }, [mealsCount]);

  const updateCategory = useCallback(
    (key: keyof CategoryDistribution, value: number) => {
      setCategories((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = () => {
    if (!isValid) return;
    onGenerate({
      mealsCount,
      categories,
      personsCount,
      excludedTags,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="section-brutal space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-mauve p-3 rounded-brutal border-3 border-deep-black shadow-brutal">
          <ChefHat size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Planifiez vos repas</h2>
          <p className="text-sm text-deep-black/60">Configurez votre semaine gourmande</p>
        </div>
      </div>

      {/* Meals Count */}
      <div className="space-y-3">
        <label className="font-bold text-deep-black text-sm uppercase tracking-wide flex items-center gap-2">
          <Utensils size={16} strokeWidth={3} />
          Nombre de repas
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={14}
            value={mealsCount}
            onChange={(e) => setMealsCount(Number(e.target.value))}
            className="flex-1"
          />
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-brutal border-3 border-deep-black bg-mauve font-bold text-2xl shadow-brutal">
            {mealsCount}
          </span>
        </div>
      </div>

      {/* Persons Count */}
      <div className="space-y-3">
        <label className="font-bold text-deep-black text-sm uppercase tracking-wide flex items-center gap-2">
          <Users size={16} strokeWidth={3} />
          Nombre de personnes
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={10}
            value={personsCount}
            onChange={(e) => setPersonsCount(Number(e.target.value))}
            className="flex-1"
          />
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-brutal border-3 border-deep-black bg-dark-orange text-white font-bold text-2xl shadow-brutal">
            {personsCount}
          </span>
        </div>
      </div>

      {/* Category Sliders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm uppercase tracking-wide">
            Répartition par catégorie
          </span>
          <span
            className={`font-bold text-sm px-3 py-1 rounded-full border-2 border-deep-black ${
              isValid ? 'bg-mauve' : 'bg-dark-orange text-white'
            }`}
          >
            {totalCategories} / {mealsCount}
          </span>
        </div>

        <BrutalSlider
          label="Économique"
          value={categories.economique}
          min={0}
          max={mealsCount}
          onChange={(v) => updateCategory('economique', v)}
          color="mauve"
          budgetLabel="< 5€/pers."
        />

        <BrutalSlider
          label="Gourmand"
          value={categories.gourmand}
          min={0}
          max={mealsCount}
          onChange={(v) => updateCategory('gourmand', v)}
          color="orange"
          budgetLabel="5-10€/pers."
        />

        <BrutalSlider
          label="Plaisir"
          value={categories.plaisir}
          min={0}
          max={mealsCount}
          onChange={(v) => updateCategory('plaisir', v)}
          color="yellow"
          budgetLabel="> 10€/pers."
        />

        {!isValid && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-dark-orange font-bold text-sm bg-dark-orange/10 border-2 border-dark-orange rounded-brutal px-4 py-2"
          >
            La somme des catégories ({totalCategories}) doit être égale au nombre de repas ({mealsCount})
          </motion.p>
        )}
      </div>

      {/* Exclusion Tags */}
      <ExclusionTags
        tags={excludedTags}
        onAdd={(tag) => setExcludedTags((prev) => [...prev, tag])}
        onRemove={(tag) => setExcludedTags((prev) => prev.filter((t) => t !== tag))}
      />

      {/* Submit Button */}
      <BrutalButton
        variant="orange"
        size="lg"
        onClick={handleSubmit}
        disabled={!isValid}
        isLoading={isLoading}
        className="w-full text-xl"
      >
        <span className="flex items-center justify-center gap-3">
          <ChefHat size={24} strokeWidth={2.5} />
          Générer mes recettes
        </span>
      </BrutalButton>
    </motion.div>
  );
}

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Header } from './components/Header';
import { MealSelector } from './components/MealSelector';
import { RecipeGrid } from './components/RecipeGrid';
import { ShoppingList } from './components/ShoppingList';
import { Spinner } from './components/ui/Spinner';
import { BrutalToaster } from './components/ui/BrutalToast';
import * as api from './lib/api';
import type {
  Recipe,
  GenerateRecipesRequest,
  ShoppingListResponse,
} from '@shared/index';

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [isRegeneratingAll, setIsRegeneratingAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<GenerateRecipesRequest | null>(null);

  const handleGenerate = useCallback(async (request: GenerateRecipesRequest) => {
    setIsGenerating(true);
    setRecipes([]);
    setLastRequest(request);
    try {
      const result = await api.generateRecipes(request);
      setRecipes(result.recipes);
      toast.success(`${result.recipes.length} recettes générées !`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erreur lors de la génération'
      );
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleRegenerateOne = useCallback(
    async (index: number) => {
      if (!lastRequest || !recipes[index]) return;
      setRegeneratingIndex(index);
      try {
        const result = await api.regenerateRecipe({
          index,
          category: recipes[index].category,
          personsCount: lastRequest.personsCount,
          excludedTags: lastRequest.excludedTags,
        });
        setRecipes((prev) => {
          const updated = [...prev];
          updated[index] = result.recipe;
          return updated;
        });
        toast.success('Recette regénérée !');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Erreur lors de la regénération'
        );
      } finally {
        setRegeneratingIndex(null);
      }
    },
    [lastRequest, recipes]
  );

  const handleRegenerateAll = useCallback(async () => {
    if (!lastRequest) return;
    setIsRegeneratingAll(true);
    try {
      const result = await api.generateRecipes(lastRequest);
      setRecipes(result.recipes);
      toast.success('Toutes les recettes ont été regénérées !');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erreur lors de la regénération'
      );
    } finally {
      setIsRegeneratingAll(false);
    }
  }, [lastRequest]);

  const handleExportShoppingList = useCallback(async () => {
    if (recipes.length === 0 || !lastRequest) return;
    setIsExporting(true);
    try {
      const result = await api.generateShoppingList({
        recipes,
        personsCount: lastRequest.personsCount,
      });
      setShoppingList(result);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erreur lors de la génération de la liste'
      );
    } finally {
      setIsExporting(false);
    }
  }, [recipes, lastRequest]);

  return (
    <div className="min-h-screen">
      <BrutalToaster />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <MealSelector onGenerate={handleGenerate} isLoading={isGenerating} />

        {isGenerating && <Spinner />}

        {!isGenerating && recipes.length > 0 && (
          <RecipeGrid
            recipes={recipes}
            onRegenerateOne={handleRegenerateOne}
            onRegenerateAll={handleRegenerateAll}
            onExportShoppingList={handleExportShoppingList}
            regeneratingIndex={regeneratingIndex}
            isRegeneratingAll={isRegeneratingAll}
            isExporting={isExporting}
          />
        )}

        {shoppingList && (
          <ShoppingList
            shoppingList={shoppingList}
            onClose={() => setShoppingList(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-deep-black bg-off-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-bold text-deep-black/60 text-sm">
            Recipe Planner — Propulsé par Claude AI
          </p>
        </div>
      </footer>
    </div>
  );
}

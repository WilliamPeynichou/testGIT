import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrutalTag } from './ui/BrutalTag';
import { COMMON_EXCLUSION_TAGS } from '@shared/index';

interface ExclusionTagsProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export function ExclusionTags({ tags, onAdd, onRemove }: ExclusionTagsProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = COMMON_EXCLUSION_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(input.toLowerCase()) &&
      !tags.includes(tag)
  );

  const handleAdd = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onAdd(tag.trim());
    }
    setInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      handleAdd(input);
    }
  };

  return (
    <div className="space-y-3">
      <label className="font-bold text-deep-black text-sm uppercase tracking-wide block">
        Exclusions / Allergies
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Tapez pour rechercher..."
          className="input-brutal w-full"
        />

        {showSuggestions && input.length > 0 && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-off-white border-3 border-deep-black rounded-brutal shadow-brutal-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleAdd(suggestion);
                }}
                className="w-full text-left px-4 py-2 font-medium hover:bg-pale-yellow transition-colors first:rounded-t-[9px] last:rounded-b-[9px]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 min-h-[32px]">
        <AnimatePresence>
          {tags.map((tag) => (
            <BrutalTag key={tag} label={tag} onRemove={() => onRemove(tag)} />
          ))}
        </AnimatePresence>
        {tags.length === 0 && (
          <span className="text-sm text-deep-black/40 italic">
            Aucune exclusion sélectionnée
          </span>
        )}
      </div>
    </div>
  );
}

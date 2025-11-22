'use client';

import { useState } from 'react';
import { Popover } from './Popover';
import { Filter } from 'lucide-react';

export type DateFilter = 'todos' | 'proximos' | 'passados';
export type CategoryFilter = 'Workshop' | 'Conferência' | 'Networking' | 'Cultural';

interface FiltersPopoverProps {
  onFiltersChange?: (filters: {
    date: DateFilter;
    categories: CategoryFilter[];
  }) => void;
}

export function FiltersPopover({ onFiltersChange }: FiltersPopoverProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('todos');
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilter[]>([]);

  const handleDateChange = (value: DateFilter) => {
    setDateFilter(value);
    onFiltersChange?.({ date: value, categories: categoryFilters });
  };

  const handleCategoryToggle = (category: CategoryFilter) => {
    const newCategories = categoryFilters.includes(category)
      ? categoryFilters.filter((c) => c !== category)
      : [...categoryFilters, category];
    
    setCategoryFilters(newCategories);
    onFiltersChange?.({ date: dateFilter, categories: newCategories });
  };

  const activeCount = (dateFilter !== 'todos' ? 1 : 0) + categoryFilters.length;

  return (
    <Popover
      trigger={
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:border-primary hover:bg-gray-50 transition-all duration-200 relative"
        >
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filtros</span>
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      }
    >
      <div className="p-4">
        {/* Seção de Data */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Data
          </h3>
          <div className="space-y-2">
            {(['todos', 'proximos', 'passados'] as DateFilter[]).map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="date"
                    value={option}
                    checked={dateFilter === option}
                    onChange={() => handleDateChange(option)}
                    className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full cursor-pointer transition-all duration-200 hover:border-primary"
                  />
                  {dateFilter === option && (
                    <div
                      className="absolute w-3 h-3 bg-primary rounded-full pointer-events-none"
                      style={{
                        animation: 'scaleIn 200ms ease-out',
                      }}
                    />
                  )}
                </div>
                <span className="text-gray-700 capitalize">
                  {option === 'proximos' ? 'Próximos' : option === 'passados' ? 'Passados' : 'Todos'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Seção de Categorias */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Categorias
          </h3>
          <div className="space-y-2">
            {(['Workshop', 'Conferência', 'Networking', 'Cultural'] as CategoryFilter[]).map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={categoryFilters.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer transition-all duration-200 hover:border-primary"
                  />
                  {categoryFilters.includes(category) && (
                    <svg
                      className="absolute w-4 h-4 text-white pointer-events-none"
                      style={{
                        animation: 'scaleIn 200ms ease-out',
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {categoryFilters.includes(category) && (
                    <div className="absolute inset-0 bg-primary rounded pointer-events-none -z-10" />
                  )}
                </div>
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botão de Limpar Filtros */}
        {activeCount > 0 && (
          <button
            onClick={() => {
              setDateFilter('todos');
              setCategoryFilters([]);
              onFiltersChange?.({ date: 'todos', categories: [] });
            }}
            className="w-full mt-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Popover>
  );
}

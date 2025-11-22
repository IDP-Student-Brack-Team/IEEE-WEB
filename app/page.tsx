'use client';

import { useState } from 'react';
import { FiltersPopover, DateFilter, CategoryFilter } from '@/components/FiltersPopover';
import { EventCard } from '@/components/EventCard';

// Dados de exemplo
const sampleEvents = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'Workshop' as CategoryFilter,
    title: 'Workshop de Robótica Avançada',
    date: '2024-03-15',
    location: 'Laboratório 3',
    participants: 45,
    isClosed: false,
    description: 'Aprenda técnicas avançadas de programação para robôs autônomos e sistemas embarcados.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
    category: 'Conferência' as CategoryFilter,
    title: 'Conferência IEEE 2024',
    date: '2024-04-20',
    location: 'Auditório Principal',
    participants: 200,
    isClosed: false,
    description: 'O maior evento de tecnologia do ano com palestrantes internacionais renomados.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
    category: 'Networking' as CategoryFilter,
    title: 'Meetup Mensal IEEE',
    date: '2024-02-10',
    location: 'Sala de Eventos',
    participants: 80,
    isClosed: true,
    description: 'Encontro para networking e troca de experiências entre profissionais e estudantes.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    category: 'Cultural' as CategoryFilter,
    title: 'Noite de Inovação',
    date: '2024-05-10',
    location: 'Campus Central',
    participants: 120,
    isClosed: false,
    description: 'Uma celebração da cultura maker com demonstrações de projetos inovadores.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    category: 'Workshop' as CategoryFilter,
    title: 'Introdução ao Machine Learning',
    date: '2024-01-25',
    location: 'Lab de Computação',
    participants: 35,
    isClosed: true,
    description: 'Workshop prático sobre algoritmos de aprendizado de máquina e suas aplicações.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    category: 'Conferência' as CategoryFilter,
    title: 'Summit de IoT',
    date: '2024-06-15',
    location: 'Centro de Convenções',
    participants: 150,
    isClosed: false,
    description: 'Explorando o futuro da Internet das Coisas com especialistas da indústria.',
  },
];

export default function Home() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('todos');
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilter[]>([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = sampleEvents.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    // Filtro de data
    let dateMatch = true;
    if (dateFilter === 'proximos') {
      dateMatch = eventDate >= today && !event.isClosed;
    } else if (dateFilter === 'passados') {
      dateMatch = eventDate < today || event.isClosed;
    }

    // Filtro de categoria
    const categoryMatch =
      categoryFilters.length === 0 || categoryFilters.includes(event.category);

    return dateMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header com Filtros */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Eventos IEEE</h1>
            <p className="text-gray-600">
              {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado
              {filteredEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <FiltersPopover
            onFiltersChange={(filters) => {
              setDateFilter(filters.date);
              setCategoryFilters(filters.categories);
            }}
          />
        </div>

        {/* Grid de Eventos */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhum evento encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

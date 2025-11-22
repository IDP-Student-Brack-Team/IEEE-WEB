import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';

interface EventCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  isClosed: boolean;
  description: string;
}

export function EventCard({
  image,
  category,
  title,
  date,
  location,
  participants,
  isClosed,
  description,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-default hover:shadow-hover transition-all duration-300">
      {/* Imagem */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {isClosed && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ENCERRADO
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <span className="inline-block bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium mb-3">
          {category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface EventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  location: string;
  subscriberCount: number;
  isFinished?: boolean;
}

export function EventCard({
  title,
  description,
  imageUrl,
  category,
  date,
  location,
  subscriberCount,
  isFinished = false,
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-[12px] overflow-hidden transition-all duration-300 ease-out"
      style={{
        boxShadow: isHovered
          ? '0 8px 24px rgba(0,0,0,0.08)'
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide"
            style={{
              backgroundColor: '#1B4B8C',
              borderRadius: '6px',
            }}
          >
            {category}
          </span>
        </div>

        {/* Finished Badge */}
        {isFinished && (
          <div className="absolute top-3 right-3">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide bg-gray-500"
              style={{
                borderRadius: '6px',
              }}
            >
              ENCERRADO
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3
          className="text-[18px] md:text-[20px] font-semibold mb-2 line-clamp-1"
          style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
        >
          {title}
        </h3>

        {/* Description with Fade Gradient */}
        <div className="relative mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
          <div
            className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, white)',
            }}
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-2 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar
              size={20}
              strokeWidth={2}
              className="flex-shrink-0"
            />
            <span>{date}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin
              size={20}
              strokeWidth={2}
              className="flex-shrink-0"
            />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users
              size={20}
              strokeWidth={2}
              className="flex-shrink-0"
            />
            <span className="font-medium">
              {subscriberCount} {subscriberCount === 1 ? 'inscrito' : 'inscritos'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

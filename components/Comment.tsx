'use client';

import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface CommentData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isAdmin?: boolean;
  };
  content: string;
  timestamp: string;
  canEdit?: boolean;
  canDelete?: boolean;
}

interface CommentProps {
  comment: CommentData;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}

export function Comment({ comment, onEdit, onDelete }: CommentProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="flex gap-3 py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="font-semibold text-gray-900"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
            >
              {comment.author.name}
            </span>
            {comment.author.isAdmin && (
              <span
                className="px-2 py-0.5 text-xs font-medium rounded"
                style={{
                  backgroundColor: '#E3F2FD',
                  color: '#1976D2',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                Admin
              </span>
            )}
            <span className="text-sm text-gray-500">
              {comment.timestamp}
            </span>
          </div>

          {/* Comment Text */}
          <p
            className="text-gray-700 text-sm"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              lineHeight: '1.6',
            }}
          >
            {comment.content}
          </p>
        </div>

        {/* Actions - Only for admins */}
        {(comment.canEdit || comment.canDelete) && (
          <div
            className="flex gap-1 ml-2 transition-opacity duration-200"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            {comment.canEdit && (
              <button
                onClick={() => onEdit?.(comment.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Editar comentário"
              >
                <Edit2 size={20} strokeWidth={2} className="text-gray-600" />
              </button>
            )}
            {comment.canDelete && (
              <button
                onClick={() => onDelete?.(comment.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Eliminar comentário"
              >
                <Trash2 size={20} strokeWidth={2} className="text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Separator */}
      <div
        className="h-px bg-gray-200"
        style={{ opacity: 0.1 }}
      />
    </>
  );
}

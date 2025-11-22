'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Comment, CommentData } from './Comment';

interface CommentSectionProps {
  comments: CommentData[];
  currentUser?: {
    name: string;
    avatar: string;
    isAuthenticated: boolean;
  };
  onAddComment?: (content: string) => void;
  onEditComment?: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

export function CommentSection({
  comments,
  currentUser,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (!commentText.trim() || !currentUser?.isAuthenticated) return;
    onAddComment?.(commentText);
    setCommentText('');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2
        className="text-xl font-semibold mb-6"
        style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
      >
        {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
      </h2>

      {/* Input Area */}
      {currentUser?.isAuthenticated ? (
        <div className="mb-8">
          <div className="flex gap-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Input Container */}
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none transition-all duration-200"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  minHeight: '80px',
                }}
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={!commentText.trim()}
                  className="px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#1B4B8C',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  PUBLICAR
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-6 border border-gray-200 rounded-xl text-center">
          <p
            className="text-gray-600"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Você precisa estar autenticado para comentar
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-0">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        ))}
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="text-center py-12">
          <p
            className="text-gray-500"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Ainda não há comentários. Seja o primeiro a comentar!
          </p>
        </div>
      )}
    </div>
  );
}

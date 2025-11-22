'use client';

import { CommentSection } from '@/components/CommentSection';
import { CommentData } from '@/components/Comment';
import { useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: '1',
      author: {
        name: 'Ana Silva',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        isAdmin: true,
      },
      content:
        'Que evento incrível! Estou muito animada para participar do workshop de IA. Será uma ótima oportunidade para aprender novas técnicas e aplicá-las em projetos reais.',
      timestamp: 'há 2 horas',
      canEdit: true,
      canDelete: true,
    },
    {
      id: '2',
      author: {
        name: 'João Pedro',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        isAdmin: false,
      },
      content:
        'Concordo! Já participei de outros eventos do IEEE e sempre foram excelentes. A qualidade dos palestrantes é sempre muito alta.',
      timestamp: 'há 1 hora',
      canEdit: false,
      canDelete: false,
    },
    {
      id: '3',
      author: {
        name: 'Maria Costa',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        isAdmin: false,
      },
      content:
        'Alguém sabe se haverá certificado de participação? Gostaria de adicionar ao meu currículo.',
      timestamp: 'há 30 minutos',
      canEdit: false,
      canDelete: false,
    },
  ]);

  const currentUser = {
    name: 'Você',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isAuthenticated: true,
  };

  const handleAddComment = (content: string) => {
    const newComment: CommentData = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        isAdmin: false,
      },
      content,
      timestamp: 'agora',
      canEdit: false,
      canDelete: false,
    };
    setComments([...comments, newComment]);
  };

  const handleEditComment = (commentId: string) => {
    console.log('Editar comentário:', commentId);
    alert(`Funcionalidade de edição para o comentário ${commentId}`);
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Tem certeza que deseja eliminar este comentário?')) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workshop de Inteligência Artificial Aplicada
          </h1>
          <p className="text-gray-600 mb-8">
            15 de Dezembro, 2025 • Laboratório de Computação - Bloco A
          </p>

          <div className="prose max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">
              Aprenda a aplicar técnicas de IA em projetos reais. Neste
              workshop, você vai aprender sobre redes neurais, machine learning
              e deep learning com exemplos práticos e hands-on. Uma experiência
              única para desenvolvedores e estudantes interessados em
              inteligência artificial.
            </p>
          </div>

          <CommentSection
            comments={comments}
            currentUser={currentUser}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
      </div>
    </div>
  );
}

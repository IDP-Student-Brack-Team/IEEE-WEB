'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label = 'Voltar' }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className="px-4">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 ease-out py-2 px-0 hover:gap-3"
        aria-label={label}
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span className="font-medium">{label}</span>
      </button>
    </div>
  );
}

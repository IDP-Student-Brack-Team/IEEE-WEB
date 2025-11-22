'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}

export function Popover({ trigger, children, align = 'start' }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getAlignmentClass = () => {
    switch (align) {
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-0';
    }
  };

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <>
          <div
            ref={popoverRef}
            className={`absolute z-50 mt-2 ${getAlignmentClass()} animate-in fade-in-0 zoom-in-95 duration-200`}
            style={{
              animation: 'fadeIn 200ms ease-out',
            }}
          >
            <div
              className="bg-white rounded-xl shadow-elevated border border-gray-200 overflow-hidden"
              style={{ minWidth: '280px' }}
            >
              {children}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}

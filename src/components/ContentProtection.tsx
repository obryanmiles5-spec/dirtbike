'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

export const ContentProtection: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');

  const triggerNotice = (msg: string) => {
    setNoticeMessage(msg);
    setShowNotice(true);
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 2800);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // 1. Context Menu (Right Click) Protection
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Allow context menu on inputs and textareas so users can paste/edit form inputs
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      e.preventDefault();
      triggerNotice('Right-click & image saving are disabled. VOLT-X content is copyright protected.');
    };

    // 2. Prevent Copy & Cut events
    const handleCopyCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      e.preventDefault();
      triggerNotice('Copying text & product specifications is restricted on VOLT-X Motorsports.');
    };

    // 3. Prevent Dragging Images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
        triggerNotice('Image dragging and saving are protected by copyright.');
      }
    };

    // 4. Keyboard Shortcuts Protection (Ctrl+C, Cmd+C, Ctrl+U, Ctrl+S, F12, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      // Disable Select All, Copy, Save, View Source, Print if not in an input field
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (isCmdOrCtrl) {
        const key = e.key.toLowerCase();
        if (['c', 'u', 's', 'p'].includes(key) && !isInput) {
          e.preventDefault();
          triggerNotice(`Shortcut (${e.metaKey ? 'Cmd' : 'Ctrl'}+${key.toUpperCase()}) blocked. Content protected.`);
        } else if (key === 'a' && !isInput) {
          e.preventDefault();
        }
      }

      // Block F12 inspect element key
      if (e.key === 'F12') {
        e.preventDefault();
        triggerNotice('Developer Tools access shortcut restricted.');
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[92%] bg-zinc-950/95 text-white border border-lime-400/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="p-2 bg-lime-400/10 border border-lime-400/30 rounded-lg text-lime-400 shrink-0">
        <Lock className="w-5 h-5" />
      </div>
      <div className="flex-1 text-xs">
        <span className="font-mono font-bold text-lime-400 uppercase tracking-wider block mb-0.5 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CONTENT PROTECTED</span>
        </span>
        <span className="text-zinc-300 font-sans leading-tight block">
          {noticeMessage}
        </span>
      </div>
    </div>
  );
};

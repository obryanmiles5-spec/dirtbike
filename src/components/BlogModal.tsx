'use client';

import React from 'react';
import { X, Calendar, Clock, User, ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { BlogCardboardHeader } from './BlogCardboardHeader';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onNavigateToShop: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  onNavigateToShop
}) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            VOLT-X POWERTRAIN BLOG & ARTICLES
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cover Cardboard */}
        <div className="relative h-64 sm:h-72 overflow-hidden border-b border-zinc-800">
          <BlogCardboardHeader post={post} compact={true} />
        </div>

        {/* Article Metadata */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-lime-400" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-lime-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-lime-400" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="text-zinc-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {post.content}
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onNavigateToShop();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20"
            >
              <span>EXPLORE HIGH-OUTPUT MACHINES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 border border-zinc-800 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-lime-400" />
              SHARE ARTICLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

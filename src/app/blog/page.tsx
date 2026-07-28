import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/data/blogs';
import { BlogCardboardHeader } from '@/components/BlogCardboardHeader';
import { BookOpen, ArrowRight, User, Calendar, Clock } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'E-Moto & Electric Dirt Bike Blog | Engineering & Trail Tech',
  description: 'Deep dives into 72V vs 80V battery architecture, backcountry trail prep, street-legal DOT conversions, and low maintenance guides for electric dirt bikes.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'VOLT-X Off-Road E-Moto Blog',
    description: 'Tech guides, battery insights, and trail preparation for electric dirt bike riders.',
    url: `${siteUrl}/blog`,
  },
};

export default function BlogListingPage() {
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'VOLT-X Motorsports Tech Blog',
    url: `${siteUrl}/blog`,
    description: 'Technical articles on battery technology, e-dirt bike setup, and off-road trail guides.',
    blogPost: BLOG_POSTS_DATA.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      url: `${siteUrl}/blog/${post.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white font-bold uppercase">BLOG</span>
          </nav>

          {/* Header */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 text-lime-400 font-mono text-xs uppercase mb-1">
              <BookOpen className="w-4 h-4" />
              <span>TECHNICAL KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
              E-Moto Tech & Trail Guides
            </h1>
            <p className="text-zinc-400 text-sm font-mono mt-2 max-w-3xl">
              In-depth engineering analysis, battery architecture teardowns, backcountry survival tips, and DOT street-legal conversion walkthroughs.
            </p>
          </div>

          {/* Grid of Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS_DATA.map((post, index) => (
              <article
                key={post.id}
                className="bg-[#0f121a] rounded-2xl border border-zinc-800/80 overflow-hidden flex flex-col justify-between hover:border-lime-400/50 transition-all group shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                    <BlogCardboardHeader post={post} index={index} compact={true} />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-lime-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-lime-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors uppercase leading-snug">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-lime-400" />
                    {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs font-black text-lime-400 hover:text-lime-300 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

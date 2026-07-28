import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/data/blogs';
import { BIKES_DATA } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';
import { Calendar, Clock, User, ArrowLeft, BookOpen, Share2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.id === id);

  if (!post) {
    return {
      title: 'Article Not Found | VOLT-X Blog',
      description: 'The requested technical guide could not be found.',
    };
  }

  const title = `${post.title} | VOLT-X Tech Blog`;
  const description = post.excerpt;
  const canonicalUrl = `${siteUrl}/blog/${post.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { id } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/blog/${post.id}`;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VOLT-X Motorsports USA Inc.',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const featuredBikes = BIKES_DATA.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-lime-400 transition-colors">BLOG</Link>
            <span>/</span>
            <span className="text-white font-bold truncate uppercase">{post.title}</span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4">
            <span className="px-3 py-1 bg-lime-400 text-zinc-950 text-xs font-black uppercase tracking-wider rounded-md inline-block">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 pt-2 border-b border-zinc-800 pb-6">
              <span className="flex items-center gap-1.5 text-zinc-200 font-bold">
                <User className="w-4 h-4 text-lime-400" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-lime-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-lime-400" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Hero Article Image */}
          <div className="relative aspect-[16/9] rounded-2xl bg-zinc-900 overflow-hidden border border-zinc-800">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <article className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
            <p className="text-lg font-medium text-white leading-relaxed border-l-4 border-lime-400 pl-4 bg-zinc-900/50 py-3 rounded-r-xl">
              {post.excerpt}
            </p>

            <div className="whitespace-pre-line space-y-4 text-zinc-300">
              {post.content}
            </div>
          </article>

          {/* Featured E-Motos Banner in Blog */}
          <div className="pt-12 border-t border-zinc-900 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Featured E-Dirt Bike Machines
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Ready to test your knowledge on the track?
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-black text-lime-400 hover:text-lime-300 uppercase tracking-wider"
              >
                View Shop
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredBikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

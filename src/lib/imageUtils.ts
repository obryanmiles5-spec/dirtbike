/**
 * Utility to format Google Drive image URLs into direct embeddable links.
 * Converts 'drive.google.com/file/d/ID/view' and 'drive.google.com/uc?id=ID'
 * into 'lh3.googleusercontent.com/d/ID'.
 */
export function formatImageUrl(url: string, fallbackUrl?: string): string {
  if (!url) return fallbackUrl || '';

  // Handle Google Drive file view links
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/file\/d\/([^\/\?]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // Handle Google Drive export links
  if (url.includes('drive.google.com/uc?')) {
    const match = url.match(/id=([^&]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  return url;
}

/**
 * Image onError handler to switch to fallback URL if primary image fails to load
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string
) {
  const target = e.currentTarget;
  if (target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
}

import { JSDOM, VirtualConsole } from 'jsdom';
import { Readability } from '@mozilla/readability';

export function extractArticle(html, url) {
  const dom = new JSDOM(html, { url, virtualConsole: new VirtualConsole() });
  const article = new Readability(dom.window.document).parse();

  if (!article || !article.content) {
    throw new Error('Could not extract a readable article from this page.');
  }

  return {
    title: article.title?.trim() || 'Untitled article',
    author: article.byline?.trim() || article.siteName || 'Unknown',
    siteName: article.siteName || new URL(url).hostname,
    excerpt: article.excerpt || '',
    lang: article.lang || 'en',
    content: article.content,
    url,
  };
}

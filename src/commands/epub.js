import { fetchPage } from '../fetchPage.js';
import { extractArticle } from '../extractArticle.js';
import { buildEpub } from '../buildEpub.js';
import { saveEpub } from '../output.js';

export const epub = {
  usage: 'epub <article-url>',
  description: 'Convert a web article into an EPUB file',
  async run(url) {
    console.log(`Fetching ${url}`);
    const { html, finalUrl } = await fetchPage(url);

    console.log('Extracting article...');
    const article = extractArticle(html, finalUrl);

    console.log(`Building EPUB for "${article.title}"`);
    const buffer = await buildEpub(article);

    const filePath = await saveEpub(buffer, article.title);
    console.log(`Saved: ${filePath}`);
    return { filePath, title: article.title };
  },
};

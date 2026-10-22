import epubModule from 'epub-gen-memory';

const epub = epubModule.default ?? epubModule;

export async function buildEpub(article) {
  const source = `<p><em>Source: <a href="${article.url}">${article.url}</a></em></p>`;

  return epub(
    {
      title: article.title,
      author: article.author,
      publisher: article.siteName,
      description: article.excerpt,
      lang: article.lang,
      tocInTOC: false,
      ignoreFailedDownloads: true,
    },
    [{ title: article.title, content: source + article.content }],
  );
}

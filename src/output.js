import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const OUTPUT_DIR = fileURLToPath(new URL('../epuboutputs/', import.meta.url));

export function toFileName(title) {
  const slug = title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return `${slug || 'article'}.epub`;
}

export async function saveEpub(buffer, title) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, toFileName(title));
  await writeFile(filePath, buffer);
  return filePath;
}

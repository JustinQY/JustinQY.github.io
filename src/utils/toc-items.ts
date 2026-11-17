import { normalizeHash } from './toc-hash';

export interface TocItem {
  href: string;
  label: string;
  children: TocItem[];
}

export function buildTocItems(
  headings: { depth: number; slug: string; text: string }[],
  maxLevels: number,
): TocItem[] {
  const items: TocItem[] = [];
  const parents: { depth: number; item: TocItem }[] = [];

  for (const { depth, slug, text } of headings) {
    while (parents.length && parents.at(-1)!.depth >= depth) parents.pop();
    if (parents.length >= maxLevels) continue;

    const item: TocItem = {
      href: normalizeHash(`#${slug}`) || `#${slug}`,
      label: text,
      children: [],
    };
    (parents.at(-1)?.item.children ?? items).push(item);
    parents.push({ depth, item });
  }

  return items;
}

export function countTocItems(items: TocItem[]): number {
  return items.reduce((count, item) => count + 1 + countTocItems(item.children), 0);
}

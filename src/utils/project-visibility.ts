import type { CollectionEntry } from 'astro:content';

// Review drafts can be read locally; static production builds always exclude them.
export function isVisibleProject({ id, data }: Pick<CollectionEntry<'projects'>, 'id' | 'data'>) {
  return id !== 'index' && (!data.draft || (import.meta.env.DEV && data.reviewReady));
}

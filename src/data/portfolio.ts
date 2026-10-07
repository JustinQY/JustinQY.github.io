import type { CollectionEntry } from 'astro:content';

type ProjectTrack = CollectionEntry<'projects'>['data']['track'];

// These slots reserve space, rather than count completed projects.
export const portfolioTracks: {
  id: ProjectTrack;
  title: string;
  context: string;
  description: string;
  icon: string;
  slots: number;
  placeholderTitle: string;
  placeholderDescription: string;
}[] = [
  {
    id: 'government',
    title: 'Data Engineer',
    context: 'Government of Ontario · Toronto, ON, CA',
    description: 'Selected data engineering projects from my government working experience.',
    icon: 'building',
    slots: 3,
    placeholderTitle: 'Government project',
    placeholderDescription:
      'A space for a data engineering case study. Project details coming soon.',
  },
  {
    id: 'ios',
    title: 'iOS Software Developer',
    context: 'Baidu, Inc. && Kuaishou Technology · Shenzhen, China',
    description: 'Selected iOS projects from my previous work career.',
    icon: 'layers',
    slots: 2,
    placeholderTitle: 'iOS project',
    placeholderDescription: 'A space for a key iOS project. Project details coming soon.',
  },
  {
    id: 'side-project',
    title: 'Explorations & Notes',
    context: 'Personal learning · AI & developer tools',
    description: 'Learning projects and technical notes alongside my professional work.',
    icon: 'sparkle',
    slots: 0,
    placeholderTitle: 'Personal project',
    placeholderDescription: 'Project details coming soon.',
  },
];

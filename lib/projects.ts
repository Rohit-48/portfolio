import type { Project } from '@/types/project'

/** Featured first, then WIP before live, then newest. */
export function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured)
      return Number(b.featured) - Number(a.featured)
    if (a.status !== b.status) return a.status === 'wip' ? -1 : 1
    return b.year - a.year
  })
}

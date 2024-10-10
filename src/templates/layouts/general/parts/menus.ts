import type { MenuItem } from '@/components/layouts/types'

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    id: 1,
    as: 'RouterLink',
    name: 'Layout Default',
    icon: 'table-view-field',
    link: '/templates/layouts/general'
  },
  {
    id: 2,
    as: 'RouterLink',
    name: 'Layout Boxed',
    icon: 'empty',
    link: '/templates/layouts/general/boxed'
  },
  {
    id: 3,
    as: 'RouterLink',
    name: 'Layout Child Menu',
    icon: 'empty',
    link: '/templates/layouts/general/child-menu'
  },
  {
    id: 3,
    as: 'group',
    name: 'With Grouping',
    icon: 'empty',
    link: '',
    items: [
      {
        id: 1,
        as: 'a',
        link: 'https://mekari.com/',
        target: 'blank',
        name: 'Content 1',
        isNewTab: true
      },
      {
        id: 2,
        as: 'RouterLink',
        link: '/',
        name: 'Content 2'
      }
    ]
  }
]

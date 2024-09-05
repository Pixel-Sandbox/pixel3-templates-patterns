import type { MenuItem } from '@/components/types'

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    as: 'RouterLink',
    name: 'Dashboard',
    icon: 'dashboard',
    link: '/templates/qontak/chat/dashboard'
  },
  {
    id: 'inbox',
    as: 'RouterLink',
    name: 'Inbox',
    icon: 'inbox',
    link: '/templates/qontak/chat/inbox'
  },
  {
    id: 'broadcast',
    as: 'RouterLink',
    name: 'Broadcast',
    icon: 'broadcast',
    link: '/templates/qontak/chat/contacts'
  },
  {
    id: 'contacts',
    as: 'RouterLink',
    name: 'Contacts',
    icon: 'contact',
    link: '/templates/qontak/chat/contacts'
  },
  {
    id: 'chatbot',
    as: 'RouterLink',
    name: 'Chatbot',
    icon: 'chatbot',
    link: '/templates/qontak/chat/chatbot'
  },
  { id: 'divider-1', as: 'divider' },
  {
    id: 'report',
    as: 'RouterLink',
    name: 'Report',
    icon: 'reports',
    link: '/templates/qontak/chat/reports'
  },
  {
    id: 'pacakge-usage',
    as: 'RouterLink',
    name: 'Package usage',
    icon: 'transfer',
    link: '/templates/qontak/chat/finances'
  },
  { id: 'divider-1', as: 'divider' },
  {
    id: 'channel-integration',
    as: 'RouterLink',
    name: 'Channel integration',
    icon: 'add-ons',
    link: '/templates/qontak/chat/integrations'
  },
  {
    id: 'settings',
    as: 'RouterLink',
    name: 'Settings',
    icon: 'settings',
    link: '/templates/qontak/chat/settings'
  }
]

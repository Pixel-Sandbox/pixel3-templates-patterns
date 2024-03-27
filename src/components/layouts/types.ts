import type { IconName } from '@mekari/pixel3'

interface SidebarMenuItem {
  as: 'RouterLink' | 'a' | 'div'
  id: string | number
  name: string
  link: string
}

export interface MenuItem {
  as: 'RouterLink' | 'a' | 'group' | 'divider'
  id?: string | number
  name?: string
  icon?: IconName
  link?: string
  isActive?: boolean
  items?: SidebarMenuItem[]
}

export interface AccountInformation {
  userPhoto: string
  fullName: string
  companyName: string
  companyId: string
}

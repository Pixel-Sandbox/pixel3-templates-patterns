import type { IconName } from '@mekari/pixel3'

export interface MenuChildItem {
  id?: string | number
  as: 'RouterLink' | 'a' | 'group' | 'divider'
  name?: string
  icon?: IconName
  link?: string
  isActive?: boolean
  isNewTab?: boolean
  target?: string
}

export interface MenuItem {
  id?: string | number
  as: 'RouterLink' | 'a' | 'group' | 'divider'
  name?: string
  icon?: IconName
  link?: string
  isActive?: boolean
  target?: string
  items?: MenuChildItem[]
}

export interface AccountInformation {
  userPhoto: string
  fullName: string
  companyName: string
  companyId: string
}

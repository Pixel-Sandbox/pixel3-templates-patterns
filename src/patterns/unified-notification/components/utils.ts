import { token, type IconName } from '@mekari/pixel3'
import { usePixelTheme } from '@mekari/pixel3-utils'

/**
 * Shared utility functions for unified notification
 */
import type { Component } from 'vue'
import {
  FacebookMessengerIcon,
  GoogleBusinessIcon,
  InstagramIcon,
  LineIcon,
  MekariQontakIcon,
  ShopeeIcon,
  TelegramIcon,
  TokopediaIcon,
  WhatsappIcon,
  XIcon
} from './channel-icon'

const { isNextTheme } = usePixelTheme()

export const CATEGORY_MAP = {
  REMINDER: 'reminder',
  AVATAR: 'avatar',
  CHANNEL_EMAIL: 'channel-email',
  CHANNEL_FACEBOOK: 'channel-facebook',
  CHANNEL_GOOGLE_BUSINESS: 'channel-google-business',
  CHANNEL_INSTAGRAM: 'channel-instagram',
  CHANNEL_TELEGRAM: 'channel-telegram',
  CHANNEL_LINE: 'channel-line',
  CHANNEL_SHOPEE: 'channel-shopee',
  CHANNEL_TOKOPEDIA: 'channel-tokopedia',
  CHANNEL_WHATSAPP: 'channel-whatsapp',
  CHANNEL_X: 'channel-x',
  CHANNEL_WEB_CHAT: 'channel-web-chat',
  CHANNEL_MOBILE_CHAT: 'channel-mobile-chat',
  CHANNEL_WHATSAPP_GROUP: 'channel-whatsapp-group',
  CHANNEL_BLOCKED_CONTACT: 'channel-blocked-contact',
  ASSIGNMENT_INBOX: 'assignment-inbox',
  ASSIGNMENT_TICKET: 'assignment-ticket',
  ASSIGNMENT_DEALS: 'assignment-deals',
  ASSIGNMENT_TASK: 'assignment-task',
  ASSIGNMENT_CUSTOMER: 'assignment-customer',
  DOWNLOAD_UPLOAD_GENERAL: 'download-upload-general',
  DOWNLOAD_UPLOAD_DEALS: 'download-upload-deals',
  DOWNLOAD_UPLOAD_TICKET: 'download-upload-ticket',
  DOWNLOAD_UPLOAD_REPORT: 'download-upload-report',
  DOWNLOAD_UPLOAD_COMPANY: 'download-upload-company',
  DOWNLOAD_UPLOAD_TASK: 'download-upload-task',
  DOWNLOAD_UPLOAD_PRODUCT: 'download-upload-product',
  DOWNLOAD_UPLOAD_EXPENSE: 'download-upload-expense',
  UPDATE_GENERAL: 'update-general',
  UPDATE_DEALS: 'update-deals',
  UPDATE_TICKET: 'update-ticket',
  UPDATE_COMPANY: 'update-company',
  UPDATE_TASK: 'update-task'
} as const

export type NotificationCategory = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]

/**
 * Get the first character of a name in uppercase
 */
export function getInitialName(name: string): string {
  if (!name) {
    return ''
  }
  return name.charAt(0).toUpperCase()
}

/**
 * Get category group from notification category
 */
export function getCategoryGroup(category: NotificationCategory): string {
  if (category === 'avatar') return 'avatar'
  if (category === 'reminder') return 'reminder'
  if (category.startsWith('channel-')) return 'channel'
  if (category.startsWith('assignment-')) return 'assignment'
  if (category.startsWith('download-upload-')) return 'download-upload'
  if (category.startsWith('update-')) return 'update'
  return 'unknown'
}

/**
 * Get the appropriate channel icon component
 */
export function getChannelIcon(category: NotificationCategory): Component | null {
  const iconMap: Record<string, Component> = {
    'channel-facebook': FacebookMessengerIcon,
    'channel-google-business': GoogleBusinessIcon,
    'channel-instagram': InstagramIcon,
    'channel-line': LineIcon,
    'channel-shopee': ShopeeIcon,
    'channel-telegram': TelegramIcon,
    'channel-tokopedia': TokopediaIcon,
    'channel-whatsapp': WhatsappIcon,
    'channel-x': XIcon,
    'channel-web-chat': MekariQontakIcon
  }

  return iconMap[category] || null
}

/**
 * Get special channel icon (for channels that use regular icons instead of components)
 */
export function getSpecialChannelIcon(category: NotificationCategory): IconName {
  const iconMap: Record<string, IconName> = {
    'channel-email': 'envelope',
    'channel-mobile-chat': 'mobile',
    'channel-whatsapp-group': 'people',
    'channel-blocked-contact': 'team'
  }

  return iconMap[category] || null
}

/**
 * Get special channel background color
 */
export function getSpecialChannelBackground(category: NotificationCategory): string | null {
  const backgroundMap: Record<string, string> = {
    'channel-email': isNextTheme.value
      ? token.var('colors.background.neutral.subtle')
      : token.var('colors.gray.25'),
    'channel-mobile-chat': isNextTheme.value
      ? token.var('colors.background.brand')
      : token.var('colors.blue.50'),
    'channel-whatsapp-group': isNextTheme.value
      ? token.var('colors.background.neutral.subtle')
      : token.var('colors.gray.25'),
    'channel-blocked-contact': isNextTheme.value ? token.var('colors.background.danger') : '#FCEEED'
  }

  return backgroundMap[category] || null
}

/**
 * Get special channel icon color
 */
export function getSpecialChannelIconColor(category: NotificationCategory): string | null {
  const colorMap: Record<string, string> = {
    'channel-email': isNextTheme.value
      ? token.var('colors.icon.highlight')
      : token.var('colors.violet.400'),
    'channel-mobile-chat': isNextTheme.value
      ? token.var('colors.icon.brand')
      : token.var('colors.blue.400'),
    'channel-whatsapp-group': isNextTheme.value
      ? token.var('colors.icon.default')
      : token.var('colors.gray.600'),
    'channel-blocked-contact': isNextTheme.value ? token.var('colors.icon.danger') : '#C33E35'
  }

  return colorMap[category] || null
}

/**
 * Get assignment icon name
 */
export function getAssignmentIcon(category: NotificationCategory): IconName {
  const iconMap: Record<string, IconName> = {
    'assignment-inbox': 'inbox',
    'assignment-ticket': 'voucher',
    'assignment-deals': 'sales',
    'assignment-task': 'task-todo',
    'assignment-customer': 'team'
  }

  return iconMap[category] || null
}

/**
 * Get download/upload icon name
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDownloadUploadIcon(category: NotificationCategory): IconName {
  const iconMap: Record<string, IconName> = {
    'download-upload-general': 'info',
    'download-upload-deals': 'sales',
    'download-upload-ticket': 'voucher',
    'download-upload-report': 'reports',
    'download-upload-company': 'company',
    'download-upload-task': 'task-todo',
    'download-upload-product': 'products',
    'download-upload-expense': 'expenses'
  }

  return iconMap[category] || null
}

/**
 * Get update icon name
 */
export function getUpdateIcon(category: NotificationCategory): IconName {
  const iconMap: Record<string, IconName> = {
    'update-general': 'info',
    'update-deals': 'sales',
    'update-ticket': 'voucher',
    'update-company': 'company',
    'update-task': 'task-todo'
  }

  return iconMap[category] || null
}

/**
 * Get background color for notification icon
 */
export function getNotificationBackground(category: NotificationCategory): string {
  if (category === 'avatar') {
    return generateAvatarBackground()
  }
  if (category === 'reminder')
    return isNextTheme.value
      ? token.var('colors.background.warning.bold')
      : token.var('colors.amber.400')
  if (category.startsWith('assignment'))
    return isNextTheme.value
      ? token.var('colors.background.brand.bold')
      : token.var('colors.sky.400')
  if (category.startsWith('download-upload'))
    return isNextTheme.value ? token.var('colors.chart.cat02.bold') : token.var('colors.teal.400')
  if (category.startsWith('update'))
    return isNextTheme.value
      ? token.var('colors.background.highlight.bold')
      : token.var('colors.violet.400')

  // Special channel backgrounds
  const specialChannelBg = getSpecialChannelBackground(category)
  if (specialChannelBg) return specialChannelBg

  return isNextTheme.value ? token.var('colors.background.inverse') : 'white'
}

/**
 * Generate avatar background color with random selection
 */
export function generateAvatarBackground(): string {
  const colors = isNextTheme.value
    ? [
        token.var('colors.chart.cat01.bold'),
        token.var('colors.chart.cat02.bold'),
        token.var('colors.chart.cat03.bold'),
        token.var('colors.chart.cat04.bold'),
        token.var('colors.chart.cat06.bold'),
        token.var('colors.chart.cat07.bold'),
        token.var('colors.chart.cat08.bold')
      ]
    : [
        token.var('colors.sky.400'),
        token.var('colors.teal.400'),
        token.var('colors.violet.400'),
        token.var('colors.amber.400'),
        token.var('colors.rose.400'),
        token.var('colors.leaf.400'),
        token.var('colors.fuchsia.400')
      ]

  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export interface Notification {
  category: NotificationCategory
  name?: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  previousCondition?: string | null
  currentCondition?: string | null
}

interface NotificationGroups {
  today: Notification[]
  older: Notification[]
}

/**
 * Group notifications by date
 */
export function groupNotificationsByDate(notifications: Notification[]): NotificationGroups {
  const groups: NotificationGroups = {
    today: [],
    older: []
  }

  notifications.forEach((notification) => {
    // For demo purposes, we'll simulate date grouping
    if (
      notification.timestamp === 'Just now' ||
      notification.timestamp.includes('minutes ago') ||
      notification.timestamp.includes('hour ago')
    ) {
      groups.today.push(notification)
    } else {
      groups.older.push(notification)
    }
  })

  return groups
}

/**
 * Utility function to define notification arrays with proper typing
 * This ensures all notification objects conform to the Notification interface
 */
export function defineNotifications(notifications: Notification[]): Notification[] {
  return notifications
}

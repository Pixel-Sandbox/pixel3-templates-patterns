import type { MenuItem } from '@/components/layouts/types'

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    id: 'home',
    as: 'RouterLink',
    name: 'Beranda',
    icon: 'home',
    link: '/templates/layouts/jurnal/home'
  },
  {
    id: 'dashboard',
    as: 'RouterLink',
    name: 'Ringkasan bisnis',
    icon: 'dashboard',
    link: '/templates/layouts/jurnal/dashboard'
  },
  {
    id: 'report',
    as: 'RouterLink',
    name: 'Laporan',
    icon: 'reports',
    link: '/templates/layouts/jurnal/report'
  },
  { id: 'divider-1', as: 'divider' },
  {
    id: 'cash-and-bank',
    as: 'RouterLink',
    name: 'Kas dan bank',
    icon: 'bank',
    link: '/templates/layouts/jurnal/cash-and-bank'
  },
  {
    id: 'sales-invoice',
    as: 'RouterLink',
    name: 'Sales',
    icon: 'sales',
    link: '/templates/layouts/jurnal/sales-invoice'
  },
  {
    id: 'purchases',
    as: 'RouterLink',
    name: 'Purchases',
    icon: 'cart',
    link: '/templates/layouts/jurnal/purchases'
  },
  {
    id: 'expenses',
    as: 'RouterLink',
    name: 'Expenses',
    icon: 'expenses',
    link: '/templates/layouts/jurnal/expenses'
  },
  {
    id: 'mekari-pay',
    as: 'RouterLink',
    name: 'Mekari Pay',
    icon: 'mekari_pay',
    link: '/templates/layouts/jurnal/mekari-pay'
  },

  { id: 'divider-1', as: 'divider' },
  {
    id: 'contact',
    as: 'RouterLink',
    name: 'Contact',
    icon: 'contact',
    link: '/templates/layouts/jurnal/contact'
  },
  {
    id: 'products',
    as: 'RouterLink',
    name: 'Products',
    icon: 'products',
    link: '/templates/layouts/jurnal/products'
  },
  {
    id: 'production',
    as: 'RouterLink',
    name: 'Production',
    icon: 'fulfillment',
    link: '/templates/layouts/jurnal/production'
  },
  {
    id: 'assets-management',
    as: 'RouterLink',
    name: 'Assets management',
    icon: 'assets',
    link: '/templates/layouts/jurnal/assets-management'
  },
  {
    id: 'chart-of-accounts',
    as: 'RouterLink',
    name: 'Charts of account',
    icon: 'chart-of-account',
    link: '/templates/layouts/jurnal/chart-of-accounts'
  },

  { id: 'divider-1', as: 'divider' },
  {
    id: 3,
    as: 'group',
    name: 'Applications',
    icon: 'application',
    link: '/templates/layouts/jurnal/app/',
    items: [
      {
        id: 1,
        as: 'a',
        link: 'https://mekari.com/',
        target: 'blank',
        name: 'Mekari Expense',
        isNewTab: true
      },
      {
        id: 2,
        as: 'RouterLink',
        link: '/templates/layouts/jurnal/app/mekari-capital',
        name: 'Mekari Capital'
      },
      { id: 3, as: 'RouterLink', link: '/templates/layouts/jurnal/e-materai', name: 'eMaterai' },
      { id: 4, as: 'RouterLink', link: '/templates/layouts/jurnal/payroll', name: 'Payroll' },
      {
        id: 5,
        as: 'RouterLink',
        link: '/templates/layouts/jurnal/tax-management',
        name: 'Tax management'
      }
    ]
  },

  { id: 'divider-1', as: 'divider' },
  {
    id: 'other-lists',
    as: 'RouterLink',
    name: 'Other lists',
    icon: 'doc',
    link: '/templates/layouts/jurnal/other-lists'
  },
  {
    id: 'add-ons',
    as: 'RouterLink',
    name: 'Add ons',
    icon: 'add-ons',
    link: '/templates/layouts/jurnal/add-ons'
  },
  {
    id: 'settings',
    as: 'RouterLink',
    name: 'Settings',
    icon: 'settings',
    link: '/templates/layouts/jurnal/settings'
  }
]

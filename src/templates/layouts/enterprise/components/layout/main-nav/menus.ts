import type { DropdownGroup } from './MenuItem.vue'

const BASE = '/templates/layouts/enterprise'

export const salesMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Sales overview', link: `${BASE}/sales-overview` },
      { label: 'Sales invoices', link: `${BASE}/sales-invoices` },
      { label: 'Sales deliveries', link: `${BASE}/sales-deliveries` },
      { label: 'Sales orders', link: `${BASE}/sales-orders` },
      { label: 'Sales quotes', link: `${BASE}/sales-quotes` }
    ]
  },
  {
    items: [
      { label: 'Customers', link: `${BASE}/customers` },
      { label: 'Sales reports', link: `${BASE}/sales-reports` },
      { label: 'Sales settings', icon: 'settings', link: `${BASE}/sales-settings` }
    ]
  }
]

export const purchasesMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Purchases overview', link: `${BASE}/purchases-overview` },
      { label: 'Purchase invoices', link: `${BASE}/purchase-invoices` },
      { label: 'Purchase receipts', link: `${BASE}/purchase-receipts` },
      { label: 'Purchase orders', link: `${BASE}/purchase-orders` },
      { label: 'Purchase quotes', link: `${BASE}/purchase-quotes` },
      { label: 'Purchase requests', link: `${BASE}/purchase-requests` }
    ]
  },
  {
    items: [
      { label: 'Vendors', link: `${BASE}/vendors` },
      { label: 'Purchase reports', link: `${BASE}/purchase-reports` },
      { label: 'Purchase settings', icon: 'settings', link: `${BASE}/purchase-settings` }
    ]
  }
]

export const inventoryMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Products', link: `${BASE}/products` },
      { label: 'Warehouses', link: `${BASE}/warehouses` },
      { label: 'Fulfillments', link: `${BASE}/fulfillments` },
      { label: 'Stock adjustment', link: `${BASE}/stock-adjustment` }
    ]
  },
  {
    items: [
      { label: 'Products reports', link: `${BASE}/products-reports` },
      { label: 'Inventory settings', icon: 'settings', link: `${BASE}/inventory-settings` }
    ]
  }
]

export const productionMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Production overview', link: `${BASE}/production-overview` },
      { label: 'Production plans', link: `${BASE}/production-plans` },
      { label: 'Work orders', link: `${BASE}/work-orders` },
      { label: 'Bill of materials', link: `${BASE}/bill-of-materials` }
    ]
  },
  {
    items: [
      { label: 'Production reports', link: `${BASE}/production-reports` },
      { label: 'Production settings', icon: 'settings', link: `${BASE}/production-settings` }
    ]
  }
]

export const reportsMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'All reports', link: `${BASE}/all-reports` },
      { label: 'Dashboard', link: `${BASE}/dashboard` }
    ]
  }
]

export const accountingMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Cash & bank', link: `${BASE}/cash-bank` },
      { label: 'Reconciliations', link: `${BASE}/reconciliations` },
      { label: 'Chart of accounts', link: `${BASE}/chart-of-accounts` },
      { label: 'Close books', link: `${BASE}/close-books` },
      { label: 'Fixed assets', link: `${BASE}/fixed-assets` }
    ]
  },
  {
    items: [{ label: 'Accounting settings', icon: 'settings', link: `${BASE}/accounting-settings` }]
  }
]

export const contactsMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Customers', link: `${BASE}/contacts/customers` },
      { label: 'Vendors', link: `${BASE}/contacts/vendors` },
      { label: 'Employees', link: `${BASE}/contacts/employees` },
      { label: 'Others', link: `${BASE}/contacts/others` }
    ]
  }
]

export const moreMenu: DropdownGroup[] = [
  {
    items: [
      { label: 'Omnichannel Commerce', link: `${BASE}/omnichannel-commerce` },
      { label: 'CRM', link: `${BASE}/crm` },
      { label: 'HR & Payroll', link: `${BASE}/hr-payroll` },
      { label: 'eSign', link: `${BASE}/esign` },
      { label: 'Consolidation', link: `${BASE}/consolidation` },
      { label: 'Tax', link: `${BASE}/tax` }
    ]
  },
  {
    items: [
      { label: 'Other lists', link: `${BASE}/other-lists` },
      { label: 'Settings', icon: 'settings', link: `${BASE}/settings` }
    ]
  }
]

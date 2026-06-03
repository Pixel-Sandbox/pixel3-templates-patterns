<script setup lang="ts">
import { MpFlex } from '@mekari/pixel3'
import MenuItem from './MenuItem.vue'
import {
  salesMenu,
  purchasesMenu,
  inventoryMenu,
  productionMenu,
  reportsMenu,
  accountingMenu,
  contactsMenu,
  moreMenu
} from './menus'
</script>

<template>
  <MpFlex
    as="nav"
    data-component="MainNav"
    data-component-group="layout"
    height="44px"
    bg="background.surface.bold"
    alignItems="center"
    px="6"
    gap="0.5"
  >
    <MenuItem label="Home" link="/templates/layouts/enterprise/home" />
    <MenuItem label="Sales" :menu-groups="salesMenu" />
    <MenuItem label="Purchases" :menu-groups="purchasesMenu" />
    <MenuItem label="Expenses" link="/templates/layouts/enterprise/expenses" />
    <MenuItem label="Inventory" :menu-groups="inventoryMenu" />
    <MenuItem label="Production" :menu-groups="productionMenu" />
    <MenuItem label="Reports" :menu-groups="reportsMenu" />
    <MenuItem label="Accounting" :menu-groups="accountingMenu" />
    <MenuItem label="Contacts" :menu-groups="contactsMenu" />
    <MenuItem label="More" :menu-groups="moreMenu" />
  </MpFlex>
</template>

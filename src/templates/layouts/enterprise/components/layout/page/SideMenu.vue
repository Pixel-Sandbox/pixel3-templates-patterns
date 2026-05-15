<script setup lang="ts">
import { css, MpText, MpDivider, MpIcon, type IconName } from '@mekari/pixel3'
import SideMenuItem from './SideMenuItem.vue'

const emit = defineEmits<{
  /** Emitted when sidebar collapse button is clicked. Used to hide the left sidebar */
  toggle: []
}>()

const menuItems = [
  { label: 'Sales invoices', link: '/templates/layouts/enterprise/sales-invoices' },
  { label: 'Sales deliveries', link: '/templates/layouts/enterprise/sales-deliveries' },
  { label: 'Sales orders', link: '/templates/layouts/enterprise/sales-orders' },
  { label: 'Sales quotes', link: '/templates/layouts/enterprise/sales-quotes' },
]

const secondaryMenuItems: { label: string; icon: IconName | null; link: string }[] = [
  { label: 'Customers', icon: null, link: '/templates/layouts/enterprise/customers' },
  { label: 'Sales settings', icon: 'settings', link: '/templates/layouts/enterprise/sales-settings' },
]
</script>

<template>
  <div
    data-component="SideMenu"
    data-component-group="layout"
    :class="css({
    display: 'flex',
    flexDirection: 'column',
    height: 'full',
    pt: '4',
    px: '2',
    gap: '2'
  })">
    <!-- Header -->
    <div :class="css({
      display: 'flex',
      alignItems: 'center',
      gap: '1',
    })">
      <button :class="css({ cursor: 'pointer' })" @click="emit('toggle')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.112 1.21405C11.013 1.21861 10.6728 1.23409 10.356 1.24842C9.18619 1.30134 7.22011 1.4661 6.46795 1.57422C4.84755 1.80717 3.4062 2.72593 2.48052 4.11594C2.00995 4.82257 1.71219 5.61381 1.5864 6.49194C1.47857 7.24485 1.32439 8.99452 1.2438 10.3799C1.2061 11.0284 1.20598 12.9686 1.24361 13.6199C1.32497 15.0278 1.49285 16.9095 1.59905 17.6039C1.95005 19.8991 3.69881 21.7928 5.96395 22.3307C6.37668 22.4287 7.14528 22.5191 8.51995 22.6312C11.1711 22.8474 12.8288 22.8474 15.48 22.6312C16.2526 22.5682 17.2021 22.4731 17.532 22.4257C19.4792 22.1457 21.1682 20.8632 21.9758 19.0512C22.259 18.4157 22.3786 17.9136 22.4863 16.9079C22.7328 14.6052 22.8309 12.68 22.7802 11.1417C22.7314 9.65939 22.547 7.35294 22.4008 6.39594C22.1299 4.62239 21.022 3.06429 19.4076 2.18651C18.8687 1.89352 18.1728 1.66636 17.532 1.57422C16.8412 1.47493 14.9767 1.31565 13.704 1.2472C13.2458 1.22257 11.4308 1.19937 11.112 1.21405ZM10.92 2.72649C9.99917 2.76954 8.82295 2.84421 8.66995 2.86931L8.59195 2.88213V11.9999V21.1178L8.66995 21.1306C8.75388 21.1443 9.47746 21.1959 10.272 21.2447C10.9164 21.2843 13.083 21.2844 13.728 21.2448C15.382 21.1432 17.1412 20.9817 17.5818 20.8909C19.0259 20.5933 20.2664 19.4871 20.7353 18.0786C20.8939 17.602 20.9348 17.3393 21.0704 15.9239C21.2264 14.2959 21.2748 13.3654 21.2748 11.9999C21.2748 10.6344 21.2264 9.70396 21.0704 8.07594C20.9348 6.66061 20.8939 6.39789 20.7353 5.92125C20.2664 4.51281 19.0259 3.40655 17.5818 3.10897C17.1532 3.02068 15.4342 2.86149 13.8 2.75877C13.4087 2.73419 11.2685 2.71019 10.92 2.72649ZM6.75595 3.05034C6.27886 3.11841 5.89911 3.23226 5.47354 3.43482C4.17879 4.05112 3.27243 5.28755 3.07419 6.70794C2.98267 7.3635 2.8278 9.11833 2.75539 10.3199C2.71476 10.9941 2.71476 13.0058 2.75539 13.6799C2.8278 14.8815 2.98267 16.6364 3.07419 17.2919C3.31546 19.0206 4.59979 20.4434 6.29995 20.8654C6.46011 20.9052 6.9193 20.9759 7.01703 20.9759H7.07995V11.9999V3.02394L6.98995 3.02687C6.94046 3.02848 6.83515 3.03904 6.75595 3.05034Z" fill="#536062"/>
          <path d="M16.6939 16.3069C16.6362 16.3407 16.542 16.378 16.4845 16.3896C16.2373 16.4399 16.0187 16.364 15.4794 16.0406C14.8405 15.6576 14.231 15.1658 13.6272 14.5463C13.0492 13.9532 12.5389 13.2787 12.1935 12.6513C12.0117 12.3211 11.9881 12.2514 11.9881 12.0468C11.9881 11.8477 12.0355 11.7232 12.2579 11.3387C12.7989 10.4037 13.6181 9.46293 14.5341 8.72491C14.8938 8.43511 15.509 8.02946 15.8494 7.85762C16.1261 7.71792 16.1367 7.71475 16.3282 7.71475C16.4943 7.71475 16.5449 7.725 16.6614 7.78221C16.9195 7.90893 17.0701 8.15179 17.0735 8.44675C17.0753 8.59615 17.0646 8.64919 17.011 8.75875C16.9201 8.94439 16.8066 9.04404 16.4761 9.22838C15.8612 9.57127 15.3602 9.95678 14.7952 10.5218C14.3645 10.9525 14.0856 11.2884 13.7832 11.7405L13.5788 12.0462L13.6904 12.2254C13.9938 12.7122 14.3631 13.1584 14.8835 13.667C15.4505 14.2212 15.8515 14.5253 16.4927 14.8871C16.6734 14.9891 16.8506 15.1072 16.8865 15.1496C17.2026 15.5234 17.1131 16.0613 16.6939 16.3069Z" fill="#536062"/>
        </svg>
      </button>

      <MpText weight="semiBold" :class="css({ letterSpacing: '0.05em' })">
        SALES
      </MpText>
    </div>

    <!-- Menu Items -->
    <div :class="css({
      display: 'flex',
      flexDirection: 'column',
      gap: '0'
    })">
      <nav :class="css({ display: 'flex', flexDirection: 'column', gap: '0.5' })">
        <SideMenuItem
          v-for="item in menuItems"
          :key="item.label"
          :label="item.label"
          :link="item.link"
        />
      </nav>

      <MpDivider />

      <nav :class="css({ display: 'flex', flexDirection: 'column', gap: '0.5', mb: '8' })">
        <SideMenuItem
          v-for="item in secondaryMenuItems"
          :key="item.label"
          :label="item.label"
          :link="item.link"
          :icon="item.icon"
        />
      </nav>

      <div :class="css({
        bg: 'background.stage',
        borderWidth: '1px',
        borderColor: 'border.default',
        rounded: 'lg',
        p: '3',
        display: 'flex',
        flexDirection: 'column',
        gap: '2'
      })">
        <div :class="css({
          display: 'flex',
          alignItems: 'center',
          gap: '1'
        })">
          <MpIcon name="tips" color="icon.brand" />
          <MpText weight="semiBold">
            Did you know?
          </MpText>
        </div>

        <MpText size="body-small">
          You can bill customers in stages. Use progress invoices to charge a down payment (e.g., 30%) now and the rest
          later, all from one sales order.
        </MpText>


        <MpText is-text-link color="text.link">
          Learn more
        </MpText>
      </div>
    </div>

  </div>
</template>

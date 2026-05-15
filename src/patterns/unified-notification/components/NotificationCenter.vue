<template>
  <MpPopover id="notification-center" is-default-open>
    <MpPopoverTrigger>
      <MpFlex position="relative" alignItems="center">
        <MpTooltip placement="bottom" :label="labelTooltip" use-portal>
          <MpButton left-icon="notification" variant="ghost" />
        </MpTooltip>
        <MpBadge
          v-if="isShowBadge"
          :class="css({ position: 'absolute', top: '0', right: '-4px' })"
          for="additionalInformation"
          type="critical"
          size="sm"
        >
          {{ unreadCountTotal > 99 ? '99+' : unreadCountTotal }}
        </MpBadge>
      </MpFlex>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          width: '480px',
          minHeight: '368px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          background: 'white',
          _nextTheme: {
            background: 'background.stage'
          }
        })
      "
      @scroll="handleScroll"
    >
      <NotificationCenterPopover :is-scrolled="isScrolled" />
    </MpPopoverContent>
  </MpPopover>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import {
    css,
    MpFlex,
    MpPopover,
    MpPopoverTrigger,
    MpPopoverContent,
    MpButton,
    MpBadge,
    MpTooltip
  } from '@mekari/pixel3'
  import NotificationCenterPopover from './NotificationCenterPopover.vue'

  const unreadCountTotal = ref(100)
  const isScrolled = ref(false)

  const isShowBadge = computed(() => unreadCountTotal.value > 0)
  const labelTooltip = computed(() =>
    isShowBadge.value
      ? `View ${unreadCountTotal.value} unread notifications.`
      : 'No new notifications yet.'
  )

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement
    isScrolled.value = target.scrollTop > 50
  }
</script>

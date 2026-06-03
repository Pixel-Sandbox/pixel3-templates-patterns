<template>
  <MpFlex
    position="relative"
    flex="none"
    alignItems="center"
    justifyContent="center"
    height="9"
    width="9"
    borderRadius="full"
    :style="{
      backgroundColor: getNotificationBackground(categoryValue)
    }"
  >
    <MpText
      v-if="categoryValue === 'avatar'"
      size="body-small"
      weight="semiBold"
      :color="isNextTheme ? 'text.inverse' : 'white'"
    >
      {{ getInitialName(name || '') }}
    </MpText>

    <MpIcon
      v-else-if="categoryValue === 'reminder'"
      name="time"
      variant="fill"
      :color="isNextTheme ? 'icon.inverse' : 'white'"
    />

    <!-- Channel Icons (Components) -->
    <component
      :is="getChannelIcon(categoryValue)"
      v-else-if="getCategoryGroup(categoryValue) === 'channel' && getChannelIcon(categoryValue)"
      :class="
        css({
          borderRadius: 'full',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '9',
          width: '9'
        })
      "
    />

    <!-- Special Channel Icons (Regular Icons) -->
    <MpIcon
      v-else-if="
        getCategoryGroup(categoryValue) === 'channel' && getSpecialChannelIcon(categoryValue)
      "
      :name="getSpecialChannelIcon(categoryValue)"
      variant="fill"
      :style="{
        color: getSpecialChannelIconColor(categoryValue) || 'text.inverse'
      }"
    />

    <!-- Assignment Icons -->
    <MpIcon
      v-else-if="
        getCategoryGroup(categoryValue) === 'assignment' && getAssignmentIcon(categoryValue)
      "
      :name="getAssignmentIcon(categoryValue)"
      variant="fill"
      :color="isNextTheme ? 'icon.inverse' : 'white'"
    />

    <!-- Download/Upload Icons -->
    <MpIcon
      v-else-if="
        getCategoryGroup(categoryValue) === 'download-upload' &&
        getDownloadUploadIcon(categoryValue)
      "
      :name="getDownloadUploadIcon(categoryValue)"
      variant="fill"
      :color="isNextTheme ? 'icon.inverse' : 'white'"
    />

    <!-- Update Icons -->
    <MpIcon
      v-else-if="getCategoryGroup(categoryValue) === 'update' && getUpdateIcon(categoryValue)"
      :name="getUpdateIcon(categoryValue)"
      variant="fill"
      :color="isNextTheme ? 'icon.inverse' : 'white'"
    />
  </MpFlex>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { MpFlex, MpIcon, MpText, css } from '@mekari/pixel3'
  import { usePixelTheme } from '@mekari/pixel3-utils'
  import {
    getAssignmentIcon,
    getCategoryGroup,
    getChannelIcon,
    getDownloadUploadIcon,
    getInitialName,
    getNotificationBackground,
    getSpecialChannelIcon,
    getSpecialChannelIconColor,
    getUpdateIcon,
    type NotificationCategory
  } from './utils'

  const { isNextTheme } = usePixelTheme()

  interface Props {
    /**
     * The type of notification icon to display
     * @default 'reminder'
     */
    category?: NotificationCategory
    /**
     * The name or identifier for the notification source
     */
    name?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    category: 'reminder',
    name: undefined
  })

  // Computed property to access the category value
  const categoryValue = computed(() => props.category)
</script>

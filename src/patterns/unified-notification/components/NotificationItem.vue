<template>
  <MpFlex
    position="relative"
    gap="3"
    alignItems="start"
    py="3"
    px="2"
    borderRadius="lg"
    cursor="pointer"
    :_hover="{
      bg: '#F7F8F9',
      _nextTheme: { bg: 'background.neutral.hovered' },
    }"
    @click="handleClick"
  >
    <!-- Notification Icon -->
    <NotificationIcon :category="category" :name="name" />

    <!-- Notification Content -->
    <MpFlex direction="column" gap="2px" width="full">
      <MpText size="label-small" weight="semiBold">
        {{ title }}
      </MpText>

      <MpText line-clamp="2" is-truncated>
        {{ message }}
      </MpText>

      <MpText
        size="label-small"
        :color="isNextTheme ? 'text.secondary' : 'gray.600'"
      >
        {{ timestamp }}
      </MpText>

      <MpFlex
        v-if="previousCondition && currentCondition"
        mt="2"
        py="1"
        px="2"
        borderRadius="lg"
        borderWidth="1px"
        :borderColor="isNextTheme ? 'background.neutral.subtle' : 'gray.50'"
      >
        <MpText
          size="body-small"
          :color="isNextTheme ? 'text.secondary' : 'gray.600'"
        >
          {{ `${previousCondition} to ${currentCondition}` }}
        </MpText>
      </MpFlex>

      <slot></slot>

      <!-- Unread indicator -->
      <MpFlex
        v-if="!hasRead"
        position="absolute"
        top="4"
        right="3"
        @click.stop="markAsRead"
      >
        <MpBadge v-tooltip="'Mark as read'" for="indicator" type="critical" />
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpBadge, MpText } from '@mekari/pixel3';
import { usePixelTheme } from '@mekari/pixel3-utils';
import NotificationIcon from './NotificationIcon.vue';
import { type NotificationCategory } from './utils';

const { isNextTheme } = usePixelTheme();

interface Props {
  /**
   * The notification category (matches NotificationIcon categories)
   * Must be one of: 'avatar', 'reminder', 'channel-*', 'assignment-*', 'download-upload-*', 'update-*'
   */
  category: NotificationCategory;
  /** User/source name (for avatar categories) */
  name?: string;
  /** Main notification title */
  title: string;
  /** Notification content/body */
  message: string;
  /** When the notification occurred */
  timestamp: string;
  /** Previous value */
  previousCondition?: string | null;
  /** Current value */
  currentCondition?: string | null;
  /** Boolean indicating read status */
  hasRead: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  previousCondition: null,
  currentCondition: null,
});

const emit = defineEmits<{
  click: [props: Props];
  markAsRead: [props: Props];
}>();

function handleClick() {
  emit('click', props);
  if (!props.hasRead) {
    emit('markAsRead', props);
  }
}

function markAsRead() {
  emit('markAsRead', props);
}
</script>

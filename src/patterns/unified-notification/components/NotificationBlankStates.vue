<template>
  <template v-if="!isLoading">
    <BlankState
      :show-blank-state="!hasNotifications"
      variant="no-notification"
      title="No notification yet"
      subtitle="Your notification list will appear here."
    />

    <BlankState
      :show-blank-state="hasViewedAll"
      variant="all-read"
      title="You have viewed all your notifications"
      subtitle="All your notifications are from the past 90 days."
    />

    <BlankState
      :show-blank-state="hasNoResult"
      variant="not-found"
      :title="`No ${generalFilter} yet`"
      :subtitle="`The ${generalFilter} list will appear here.`"
    />
  </template>
</template>

<script setup lang="ts">
import BlankState from './BlankState.vue';

interface NotificationBlankStatesProps {
  isLoading: boolean;
  hasNotifications: boolean;
  hasViewedAll: boolean;
  hasNoResult: boolean;
  generalFilter: string;
}

defineProps<NotificationBlankStatesProps>();
</script>

import { computed } from 'vue';
import type { Notification } from '../components/utils';

export interface NotificationTabProps {
  isLoading: boolean;
  isShowUnreadOnly: boolean;
  generalFilter: string;
  notifications: Notification[];
}

export interface NotificationTabEmits {
  notificationClick: [notification: Notification];
  markAsRead: [notification: Notification];
}

export function useNotificationTab(
  props: NotificationTabProps,
  emit: {
    (e: 'notificationClick', notification: Notification): void;
    (e: 'markAsRead', notification: Notification): void;
  }
) {
  // Computed properties
  const hasNotifications = computed(() => props.notifications.length > 0);

  const hasViewedAll = computed(
    () => hasNotifications.value && !props.notifications.some(n => !n.isRead)
  );

  const hasNoResult = computed(() => {
    return false;
  });

  // Event handlers
  function handleNotificationClick(notification: Notification) {
    emit('notificationClick', notification);
  }

  function handleMarkAsRead(notification: Notification) {
    emit('markAsRead', notification);
  }

  return {
    hasNotifications,
    hasViewedAll,
    hasNoResult,
    handleNotificationClick,
    handleMarkAsRead,
  };
}

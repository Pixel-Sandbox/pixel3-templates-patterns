import { describe, it, expect, vi } from 'vitest';
import { useNotificationTab } from './useNotificationTab';
import type { Notification } from '../components/utils';

const mockNotifications: Notification[] = [
  {
    category: 'reminder',
    name: 'Test',
    title: 'Test Notification',
    message: 'Test message',
    timestamp: 'Just now',
    isRead: false,
    previousCondition: '',
    currentCondition: '',
  },
  {
    category: 'avatar',
    name: 'Test 2',
    title: 'Test Notification 2',
    message: 'Test message 2',
    timestamp: '1 hour ago',
    isRead: true,
    previousCondition: '',
    currentCondition: '',
  },
];

describe('useNotificationTab', () => {
  it('should calculate hasNotifications correctly', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: mockNotifications,
    };
    const emit = vi.fn();

    const { hasNotifications } = useNotificationTab(props, emit);

    expect(hasNotifications.value).toBe(true);
  });

  it('should calculate hasNotifications as false when no notifications', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: [],
    };
    const emit = vi.fn();

    const { hasNotifications } = useNotificationTab(props, emit);

    expect(hasNotifications.value).toBe(false);
  });

  it('should calculate hasViewedAll correctly when all notifications are read', () => {
    const readNotifications = mockNotifications.map(n => ({
      ...n,
      isRead: true,
    }));
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: readNotifications,
    };
    const emit = vi.fn();

    const { hasViewedAll } = useNotificationTab(props, emit);

    expect(hasViewedAll.value).toBe(true);
  });

  it('should calculate hasViewedAll as false when some notifications are unread', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: mockNotifications,
    };
    const emit = vi.fn();

    const { hasViewedAll } = useNotificationTab(props, emit);

    expect(hasViewedAll.value).toBe(false);
  });

  it('should return false for hasNoResult', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: mockNotifications,
    };
    const emit = vi.fn();

    const { hasNoResult } = useNotificationTab(props, emit);

    expect(hasNoResult.value).toBe(false);
  });

  it('should handle notification click correctly', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: mockNotifications,
    };
    const emit = vi.fn();

    const { handleNotificationClick } = useNotificationTab(props, emit);
    const notification = mockNotifications[0];

    handleNotificationClick(notification);

    expect(emit).toHaveBeenCalledWith('notificationClick', notification);
  });

  it('should handle mark as read correctly', () => {
    const props = {
      isLoading: false,
      isShowUnreadOnly: false,
      generalFilter: 'all',
      notifications: mockNotifications,
    };
    const emit = vi.fn();

    const { handleMarkAsRead } = useNotificationTab(props, emit);
    const notification = mockNotifications[0];

    handleMarkAsRead(notification);

    expect(emit).toHaveBeenCalledWith('markAsRead', notification);
  });
});

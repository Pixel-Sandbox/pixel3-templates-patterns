<template>
  <div id="notification-center-popover">
    <MpFlex
      id="notification-center-header"
      alignItems="center"
      justifyContent="space-between"
      pt="4"
      pb="2"
      px="4"
    >
      <MpText size="h2">Notifications</MpText>
      <MpToggle v-model:is-checked="isShowUnreadOnly">
        Show unread only
      </MpToggle>
    </MpFlex>

    <MpFlex id="notification-center-content">
      <MpTabs
        id="notification-center-tabs"
        v-model="currentTab"
        is-manual
        :class="css({ width: 'full', mb: '0' })"
        @change="handleChangTab"
      >
        <div
          :class="
            css({
              position: 'sticky',
              top: 0,
              zIndex: 1,
              background: 'white',
              _nextTheme: {
                background: 'background.stage',
              },
            })
          "
          :style="{
            boxShadow: isScrolled ? token.var('shadows.xs') : 'none',
          }"
        >
          <MpTabList
            :class="css({ '& > div': { marginBottom: '0', px: '4' } })"
          >
            <MpTab v-for="(tab, index) in tabs" :key="index">
              {{ tab.name }}
              <MpBadge
                v-if="tab.unreadCount > 0"
                for="additionalInformation"
                type="critical"
                :class="
                  css({
                    marginLeft: '2',
                  })
                "
              >
                {{ tab.unreadCount }}
              </MpBadge>
            </MpTab>
          </MpTabList>

          <!-- Filter Area -->
          <MpFlex
            alignItems="center"
            justifyContent="space-between"
            py="2"
            px="4"
          >
            <MpFlex width="216px">
              <MpAutocomplete
                v-model="generalFilter"
                :data="currentFilterData"
              />
            </MpFlex>

            <MpButton variant="textLink" @click="handleMarkAllAsRead">
              Mark all as read
            </MpButton>
          </MpFlex>
          <!-- End of Filter Area -->
        </div>

        <MpTabPanels>
          <MpTabPanel>
            <!-- General Tab Content -->
            <TabGeneral
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="generalTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>

          <MpTabPanel>
            <!-- Inbox Tab Content -->
            <TabInbox
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="inboxTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>

          <MpTabPanel>
            <!-- Approval Tab Content -->
            <TabApproval
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="approvalTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>
        </MpTabPanels>
      </MpTabs>
    </MpFlex>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  css,
  token,
  MpAutocomplete,
  MpBadge,
  MpButton,
  MpFlex,
  MpTab,
  MpTabList,
  MpTabs,
  MpTabPanels,
  MpTabPanel,
  MpText,
  MpToggle,
} from '@mekari/pixel3';
import TabGeneral from './TabGeneral.vue';
import TabInbox from './TabInbox.vue';
import TabApproval from './TabApproval.vue';
import { defineNotifications, type Notification } from './utils';

// Reactive state
const currentTab = ref(0);
const isLoading = ref(false);
const generalFilter = ref('All general notifications');
const isShowUnreadOnly = ref(false);

// Static filter data (UI only)
const generalFilterData = [
  'All general notifications',
  'Reminder',
  'Mention',
  'Assignment',
  'Update',
  'Download & upload',
];
const inboxFilterData = [
  'All inbox notifications',
  'Incoming chats',
  'Chat assignments',
  'Resolved chats',
  'Blocked contacts',
];
const approvalFilterData = ['All request', 'Deals', 'Expenses'];

const tabs = [
  { name: 'General', unreadCount: 8 },
  { name: 'Inbox', unreadCount: 12 },
  { name: 'Approval', unreadCount: 3 },
];

const generalTabNotifications = defineNotifications([
  {
    category: 'reminder',
    title: 'Deals due soon on 20 June 2025, 11:11',
    message: '24 June 2025 - Blanco Coffee Blok M',
    timestamp: 'Just now',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Christin Purnama Sari',
    title: 'Christin Purnama Sari mentioned you in Deals',
    message: '1234ABCD - Espresso machine bulk sales',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    category: 'assignment-task',
    name: 'Rizal Chandra',
    title: 'Rizal Chandra assigned you a task',
    message: 'Coffee machine warranty void procedure guideline',
    timestamp: '5 minutes ago',
    isRead: false,
  },
  {
    category: 'reminder',
    title: 'SLA will breach in 1 minute',
    message: 'First respond to Anastasia Utami',
    timestamp: '10 minutes ago',
    isRead: false,
  },
  {
    category: 'download-upload-general',
    title: 'File ready to download',
    message: 'Deals export - 30 Jul 2025',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    category: 'update-general',
    title: 'System update completed',
    message: 'Platform has been updated to version 2.5.1 with new features',
    timestamp: '20 minutes ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Ahmad Rahman',
    title: 'Ahmad Rahman mentioned you in Deals',
    message: '5678WXYZ - Premium coffee subscription service',
    timestamp: '25 minutes ago',
    isRead: true,
  },
  {
    category: 'assignment-task',
    name: 'Maya Putri',
    title: 'Maya Putri assigned you a task',
    message: 'Prepare quarterly sales report for board meeting',
    timestamp: '30 minutes ago',
    isRead: false,
  },
  {
    category: 'reminder',
    title: 'Meeting reminder',
    message: 'Daily standup meeting starts in 15 minutes',
    timestamp: '1 hour ago',
    isRead: true,
  },
  {
    category: 'download-upload-general',
    title: 'File ready to download',
    message: 'Company export at 30 Jul 2025, 12:23',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Jessie Tan',
    title: 'Jessie Tan mentioned you in Tasks',
    message: 'Follow up visit',
    timestamp: '2 hours ago',
    isRead: true,
  },
  {
    category: 'reminder',
    title: 'Task deadline approaching',
    message: 'Complete customer feedback analysis by 5 PM today',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    category: 'update-general',
    title: 'Security patch applied',
    message: 'Important security updates have been installed automatically',
    timestamp: '4 hours ago',
    isRead: true,
  },
  {
    category: 'assignment-task',
    name: 'Sari Dewi',
    title: 'Sari Dewi assigned you a checklist in a Tasks',
    message: 'Customer database update verification steps',
    timestamp: '20 Jul 2025 at 16:15',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Bambang Sutrisno',
    title: 'Bambang Sutrisno mentioned you in Companies',
    message: 'ABC Corporation',
    timestamp: '20 Jul 2025 at 14:45',
    isRead: true,
  },
]);

const inboxTabNotifications = defineNotifications([
  {
    category: 'channel-whatsapp',
    title: 'Indra Pangestu sent a message',
    message: '"Kak kapan bisa cair refundnya ya?"',
    timestamp: 'Just now',
    isRead: false,
  },
  {
    category: 'channel-whatsapp',
    title: 'Indra Pangestu sent 10 messages',
    message:
      '"Kak kapan bisa cair refundnya ya? Saya udah nunggu lama banget barangnya juga ga bisa dipake tapi ga ada respo..."',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    category: 'channel-instagram',
    title: 'Siti Aisyah Putri commented',
    message: '"Berapa lama pengiriman untuk wilayah Jakarta?"',
    timestamp: '5 minutes ago',
    isRead: false,
  },
  {
    category: 'channel-whatsapp',
    title: 'Maya Sari sent a message',
    message: '"Terima kasih atas pelayanannya yang luar biasa!"',
    timestamp: '10 minutes ago',
    isRead: true,
  },
  {
    category: 'channel-shopee',
    title: 'Maya Sari Putri sent a message',
    message: '"Berapa lama pengiriman untuk wilayah Jakarta?"',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    category: 'channel-tokopedia',
    title: 'Andi Setiawan sent a message',
    message: '"Apakah ada diskon untuk pembelian dalam jumlah besar?"',
    timestamp: '20 minutes ago',
    isRead: true,
  },
  {
    category: 'channel-whatsapp',
    title: 'Siti Rahayu sent a message',
    message: '"Apakah produk masih tersedia untuk pengiriman hari ini?"',
    timestamp: '25 minutes ago',
    isRead: false,
  },
  {
    category: 'channel-google-business',
    title: 'Rudi Setiawan left a review',
    message:
      '"A very nice and vintage place to grab the most delicious coffee in Jogja."',
    timestamp: '30 minutes ago',
    isRead: false,
  },
  {
    category: 'channel-instagram',
    title: '@fashionista_id sent a direct message',
    message: '"Hi, apakah produk ini masih tersedia?"',
    timestamp: '1 hour ago',
    isRead: true,
  },
  {
    category: 'channel-whatsapp',
    title: 'Indra Pangestu sent a message',
    message: 'Image',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    category: 'channel-email',
    title: 'Tri Wulandari sent an email',
    message:
      '"Variant yang saya beli kemarin ternyata beda ukuran dengan dripper yang saya punya, masih bisa retur ngga y..."',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    category: 'channel-shopee',
    title: 'Rizki Pratama sent a message',
    message: '"Masih ada stok untuk produk ini tidak?"',
    timestamp: '3 hours ago',
    isRead: false,
  },
  {
    category: 'channel-google-business',
    title: 'Sari Dewi left a review',
    message:
      '"Excellent customer service! Highly recommended. 5 stars ⭐⭐⭐⭐⭐"',
    timestamp: '4 hours ago',
    isRead: true,
  },
  {
    category: 'channel-whatsapp',
    name: 'Eka Setiawan',
    title: 'Eka Setiawan resolved a conversation',
    message: 'Indra Pangestu',
    timestamp: '5 hours ago',
    isRead: false,
  },
  {
    category: 'channel-instagram',
    title: '@coffeelover22 commented',
    message: '"Looks amazing! Where can I order this?"',
    timestamp: '20 Jul 2025 at 14:20',
    isRead: false,
  },
  {
    category: 'channel-email',
    title: 'Lisa Chen sent an email',
    message:
      '"Hello, I need help with my recent order and would like to know the status"',
    timestamp: '20 Jul 2025 at 22:15',
    isRead: true,
  },
  {
    category: 'channel-blocked-contact',
    name: 'Jessie Tan',
    title: 'Jessie Tan blocked a contact',
    message: 'Sari Ayu',
    timestamp: '19 Jul 2025 at 16:30',
    isRead: false,
  },
]);

const approvalTabNotifications = defineNotifications([
  {
    category: 'avatar',
    name: 'Ali Imran',
    title: 'Ali Imran request to add a deals on Sales Pipeline',
    message: '7890UIIAI - Refund broken coffee machine',
    timestamp: 'Just now',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Galih Prakoso',
    title: 'Galih Prakoso request to add a expense',
    message: 'Business trip to Tokyo 12 Agustus 2025',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Maya Putri',
    title: 'Maya Putri request to add a expense',
    message: 'Conference registration fee - Tech Summit 2025',
    timestamp: '5 minutes ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Rizal Chandra',
    title: 'Rizal Chandra approved your request to create a deals',
    message: '4567UUIAI - Origami paper filter 100 pcs',
    timestamp: '10 minutes ago',
    isRead: true,
  },
  {
    category: 'avatar',
    name: 'Rizal Chandra',
    title: 'Rizal Chandra request to edit expense amount',
    message: 'Business trip to Tokyo 12 Agustus 2025',
    timestamp: '15 minutes ago',
    isRead: false,
    previousCondition: 'IDR 20.000.000',
    currentCondition: 'IDR 32.000.000',
  },
  {
    category: 'avatar',
    name: 'Sari Dewi',
    title: 'Sari Dewi request to add a deals on Lead Qualification',
    message: '1234ABCD - Espresso machine bulk sales',
    timestamp: '20 minutes ago',
    isRead: true,
  },
  {
    category: 'avatar',
    name: 'Jessie Tan',
    title: 'Jessie Tan request to move a deal',
    message: '4567UUIAI - Origami paper filter 100 pcs',
    timestamp: '25 minutes ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Rizal Chandra',
    title: 'Rizal Chandra approved your request to add an expense',
    message: 'Business trip to Tokyo 12 Agustus 2025',
    timestamp: '30 minutes ago',
    isRead: true,
  },
  {
    category: 'avatar',
    name: 'Linda Sari',
    title: 'Linda Sari rejected your request to add an expense',
    message: 'Team building activity at Sentul',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    category: 'avatar',
    name: 'Jessie Tan',
    title: 'Jessie Tan approved your request to move a deals',
    message: '4567UUIAI - Origami paper filter 100 pcs',
    timestamp: '2 hours ago',
    isRead: true,
    previousCondition: 'Lead Qualification',
    currentCondition: 'Proposal Sent',
  },
  {
    category: 'avatar',
    name: 'Ahmad Rahman',
    title: 'Ahmad Rahman request to move a deal',
    message: '9876XYZI - Premium coffee beans subscription',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    category: 'avatar',
    name: 'Rizal Chandra',
    title: 'Rizal Chandra rejected request to edit expense category',
    message: 'Business trip to Tokyo 12 Agustus 2025',
    timestamp: '4 hours ago',
    isRead: false,
    previousCondition: 'Entertainment',
    currentCondition: 'Hotel/Lodging/Accommodation',
  },
]);

// Computed properties
const currentFilterData = computed(() => {
  switch (currentTab.value) {
    case 0:
      return generalFilterData;
    case 1:
      return inboxFilterData;
    case 2:
      return approvalFilterData;
    default:
      return generalFilterData;
  }
});

type NotificationCenterPopoverProps = {
  isScrolled: boolean;
};

withDefaults(defineProps<NotificationCenterPopoverProps>(), {
  isScrolled: false,
});

// Lifecycle
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

// Methods
function handleChangTab() {
  // Update filter display (UI only)
  switch (currentTab.value) {
    case 0:
      generalFilter.value = 'All general notifications';
      break;
    case 1:
      generalFilter.value = 'All inbox notifications';
      break;
    case 2:
      generalFilter.value = 'All request';
      break;
  }
}

// UI-only handlers
function handleMarkAllAsRead() {
  console.log('Mark all as read clicked (UI only)');
}

function handleNotificationClick(notification: Notification) {
  console.log('Notification clicked (UI only):', notification);
}

function handleMarkAsRead(notification: Notification) {
  console.log('Mark as read (UI only):', notification);
}
</script>

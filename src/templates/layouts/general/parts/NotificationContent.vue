<script setup lang="ts">
  import {
    MpAutocomplete,
    MpAvatar,
    MpButton,
    MpDivider,
    MpIcon,
    MpPopover,
    MpPopoverContent,
    MpPopoverList,
    MpPopoverListItem,
    MpPopoverTrigger,
    MpTab,
    MpTabList,
    MpTabs,
    MpText,
    MpTooltip,
    css
  } from '@mekari/pixel3'
  import { computed, onMounted, ref } from 'vue'

  const currentTab = ref(0)
  const notificationTitle = ref()
  const isHeaderSticky = ref(false)
  const state = ref({
    generalFilter: 'All notifications',
    generalFilterData: [
      'All notifications',
      'Reminder',
      'Mention',
      'Assignment',
      'Complete',
      'Download',
      'Upload'
    ],
    generalData: [
      {
        date: 'Today',
        data: [
          {
            title: '<b>Data Company</b> is successfully downloaded.',
            date: '1 hour ago',
            icon: 'download',
            avatar: '',
            type: 'Download',
            isNew: true,
            hasMenu: false
          },
          {
            title:
              '<b>Rizal Chandra</b> set a task to be due on <b>12 April 2022 at 11:11 (GMT+7)</b>.',
            date: '2 hours ago',
            icon: 'overtime',
            avatar: '',
            type: 'Reminder',
            isNew: true,
            hasMenu: false
          }
        ]
      },
      {
        date: 'Yesterday',
        data: [
          {
            title: '<b>Data Company</b> is successfully uploaded.',
            date: '4 February 2021 at 16:00 (GMT+7)',
            icon: 'upload',
            avatar: '',
            type: 'Upload',
            isNew: false,
            hasMenu: false
          }
        ]
      },
      {
        date: 'Older',
        data: [
          {
            title:
              '<b>Christin Purnama Sari</b> mentioned you on <b>Deals: MHJ Reports Enhancement.</b>.',
            date: '8 April 2021 at 16:00 (GMT+7)',
            icon: 'comment',
            avatar: '',
            type: 'Mention',
            isNew: false,
            hasMenu: false
          },
          {
            title: '<b>Rizal Chandra</b> assigned you for <b>Deals: Ajinomoto basic package</b>.',
            date: '8 April 2021 at 16:00 (GMT+7)',
            icon: 'task-todo',
            avatar: '',
            type: 'Assigment',
            isNew: false,
            hasMenu: false
          },
          {
            title: '<b>Rizal Chandra</b> completed <b>Data Company</b>.',
            date: '8 April 2021 at 16:00 (GMT+7)',
            icon: 'upload',
            avatar: '',
            type: 'Upload',
            isNew: false,
            hasMenu: false
          },
          {
            title: '<b>Rizal Chandra</b> assigned you for <b>Deals: Ajinomoto basic package</b>.',
            date: '8 April 2021 at 16:00 (GMT+7)',
            icon: 'task-todo',
            avatar: '',
            type: 'Assigment',
            isNew: false,
            hasMenu: false
          },
          {
            title:
              '<b>Christin Purnama Sari</b> mentioned you on <b>Deals: MHJ Reports Enhancement</b>.',
            date: '8 April 2021 at 16:00 (GMT+7)',
            icon: 'comment',
            avatar: '',
            type: 'Mention',
            isNew: false,
            hasMenu: false
          },
          {
            title:
              '<b>Christin Purnama Sari</b> mentioned you on <b>Deals: MHJ Reports Enhancement</b>.',
            date: '9 April 2021 at 16:00 (GMT+7)',
            icon: 'comment',
            avatar: '',
            type: 'Mention',
            isNew: false,
            hasMenu: false
          }
        ]
      }
    ],
    needApprovalFilter: 'All approval',
    needApprovalFilterData: ['All approval', 'Deals', 'Expenses'],
    needApprovalData: [
      {
        date: 'Today',
        data: [
          {
            title:
              '<b>Christin Purnama Sari</b> has requested to move deals <b>Ajinomoto basic package</b> from Qualified to In progress.',
            date: '1 hour ago',
            icon: '',
            avatar: 'https://i.pravatar.cc/300?img=47',
            link: 'https://mekari.com',
            type: 'Expenses',
            isNew: true,
            hasMenu: true
          },
          {
            title:
              '<b>Rizal Chandra</b> has requested to update expense </b>27 May 2022</b> amount from IDR 600.000 to IDR 800.000.',
            date: '1 hour ago',
            icon: '',
            avatar: 'https://i.pravatar.cc/300?img=12',
            link: 'https://mekari.com',
            type: 'Expenses',
            isNew: false,
            hasMenu: true
          },
          {
            title:
              '<b>Rizal Chandra</b> has requested to add Deals <b>Pintap enterprise package</b> in stage New.',
            date: '1 hour ago',
            icon: '',
            avatar: 'https://i.pravatar.cc/300?img=12',
            link: 'https://mekari.com',
            type: 'Expenses',
            isNew: false,
            hasMenu: true
          }
        ]
      }
    ]
  })

  const isEmptyNotification = computed(() => state.value.generalFilter === 'Upload')
  const getNotificationDatas = computed(() => {
    if (currentTab.value === 0) {
      return state.value.generalData
    }

    return state.value.needApprovalData
  })

  function handleSticky() {
    const el = notificationTitle.value
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === false) {
          isHeaderSticky.value = true
        } else {
          isHeaderSticky.value = false
        }
      },
      { threshold: [0] }
    )

    observer.observe(el)
  }

  onMounted(() => {
    handleSticky()
  })
</script>

<template>
  <div>
    <div ref="notificationTitle" :class="css({ p: '4' })">
      <MpText weight="semiBold" size="h3"> Notification </MpText>
    </div>

    <div
      :class="
        css({
          bg: 'background.neutral',
          position: 'sticky',
          top: '0',
          left: '0',
          zIndex: 'sticky',
          shadow: isHeaderSticky ? 'sm' : ''
        })
      "
    >
      <div>
        <div :class="css({ px: '4' })">
          <MpTabs v-model="currentTab" is-manual>
            <MpTabList>
              <MpTab> General </MpTab>
              <MpTab> Need Approval </MpTab>
            </MpTabList>
          </MpTabs>
        </div>

        <MpDivider
          :class="
            css({
              marginTop: '-26px'
            })
          "
        />

        <div
          :class="
            css({
              pt: 2,
              px: 4,
              pb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            })
          "
        >
          <div v-if="currentTab === 0">
            <MpAutocomplete v-model="state.generalFilter" :data="state.generalFilterData" />
          </div>

          <div v-if="currentTab === 1">
            <MpAutocomplete
              v-model="state.needApprovalFilter"
              :data="state.needApprovalFilterData"
            />
          </div>

          <div>
            <MpText color="blue.500" style="cursor: pointer"> Mark all as read </MpText>
          </div>
        </div>
      </div>
    </div>

    <div :class="css({ pt: 8 })">
      <!-- General notification -->
      <ul v-if="!isEmptyNotification">
        <li v-for="(general, index) in getNotificationDatas" :key="index">
          <MpText
            v-if="
              general.data.find(
                (item) =>
                  state.generalFilter === item.type || state.generalFilter === 'All notifications'
              )
            "
            :key="`general-${index}`"
            color="gray.600"
            size="label-small"
            :class="css({ px: '4', pb: '2' })"
          >
            {{ general.date }}
          </MpText>

          <ul>
            <li v-for="(item, index2) in general.data" :key="`${index}-${index2}`">
              <div
                v-if="
                  state.generalFilter === item.type || state.generalFilter === 'All notifications'
                "
                :class="
                  css({
                    display: 'flex',
                    px: '4',
                    py: '3',
                    gap: '16px',
                    width: 'full',
                    _hover: {
                      bg: 'gray.50',
                      cursor: 'pointer'
                    }
                  })
                "
              >
                <MpIcon v-if="item.icon" :name="item.icon" />
                <MpAvatar v-if="item.avatar" :src="item.avatar" />

                <div
                  :class="
                    css({
                      display: 'flex',
                      flexDirection: 'column',
                      width: '390px'
                    })
                  "
                >
                  <MpText v-html="item.title" />
                  <MpText size="label-small" color="gray.600">
                    {{ item.date }}
                  </MpText>
                </div>

                <div v-if="item.isNew">
                  <MpTooltip label="Mark as read" placement="left">
                    <MpIcon name="indicator-circle" color="red.400" />
                  </MpTooltip>
                </div>

                <div v-if="item.hasMenu">
                  <MpPopover>
                    <MpPopoverTrigger>
                      <MpButton variant="ghost" leftIcon="menu-kebab" size="sm" />
                    </MpPopoverTrigger>

                    <MpPopoverContent :class="css({ width: '65' })">
                      <MpPopoverList>
                        <MpPopoverListItem> Approve </MpPopoverListItem>
                        <MpPopoverListItem> Reject </MpPopoverListItem>
                      </MpPopoverList>
                    </MpPopoverContent>
                  </MpPopover>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <div
        v-if="isEmptyNotification"
        :class="
          css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            pb: '16'
          })
        "
      >
        <img
          src="https://cdn.mekari.design/illustration/blank-slate/NoInbox_PB_M_01.png"
          alt=""
          style="width: 216px"
        />

        <MpText size="h1" :class="css({ mt: '2' })"> No notification </MpText>

        <MpText :class="css({ mt: '2' })"> The notification list will show here. </MpText>
      </div>

      <footer
        v-if="!isEmptyNotification"
        :class="
          css({
            p: '4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          })
        "
      >
        <img src="/notification.png" alt="" style="width: 48px" />

        <MpText :class="css({ mt: '2' })">
          That's all your notifications from the last 90 days.
        </MpText>
      </footer>
    </div>
  </div>
</template>

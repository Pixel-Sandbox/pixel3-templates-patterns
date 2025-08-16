<script setup lang="ts">
  import { ref, computed, PropType } from 'vue'
  import { css, MpText, MpFlex, MpIcon, MpBadge, MpCheckbox, IconName, token } from '@mekari/pixel3'

  import { ChatContent, ChatStatus } from './type'

  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    iconName: {
      type: String as PropType<IconName>,
      default: 'qontak-brand'
    },
    senderName: {
      type: String,
      default: ''
    },
    timeStamp: {
      type: String,
      default: ''
    },
    sla: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    channelName: {
      type: String,
      default: ''
    },
    contentUnread: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    contentType: {
      type: String as PropType<ChatContent>,
      default: 'text'
    },
    status: {
      type: String as PropType<ChatStatus>,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isShowSLA: {
      type: Boolean,
      default: false
    },
    isShowReplies: {
      type: Boolean,
      default: false
    }
  })

  const emits = defineEmits(['click', 'checked', 'hover'])

  const isHovered = ref(false)
  const isChecked = ref(false)

  const isUnread = computed(() => {
    return props.contentUnread !== ''
  })

  const getChatBackground = computed(() => {
    if (isChecked.value) {
      return token.var('colors.background.brand.pressed')
    }

    if (props.isActive) {
      return token.var('colors.background.brand.selected')
    }

    if (isHovered.value) {
      return token.var('colors.background.neutral.hovered')
    }

    return token('colors.background.neutral')
  })

  const getStatusColor = computed(() => {
    if (props.status === 'unassigned') {
      return token.var('colors.text.warning')
    }

    if (props.status === 'assigned') {
      return token.var('colors.text.information')
    }

    if (props.status === 'resolved') {
      return token.var('colors.text.success')
    }

    return ''
  })

  function handleContentIcon() {
    if (props.contentType === 'document') {
      return 'doc'
    }

    if (props.contentType === 'image') {
      return 'img'
    }

    if (props.contentType === 'video') {
      return 'empty'
    }

    if (props.contentType === 'map') {
      return 'location'
    }

    if (props.contentType === 'contact') {
      return 'contact'
    }
  }

  function handleClick() {
    emits('click', props.id)
  }

  function handleChecked() {
    emits('checked', props.id, !isChecked.value)
  }

  function handleHover() {
    isHovered.value = !isHovered.value
    emits('hover', props.id, isHovered.value)
  }
</script>

<template>
  <MpFlex
    as="li"
    tabindex="0"
    flex="none"
    gap="2"
    width="full"
    minWidth="76px"
    height="auto"
    py="2"
    px="3"
    cursor="pointer"
    borderBottom="1px"
    borderColor="border.default"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
    @click="handleClick"
    @keyup.enter="handleClick"
    :_focusVisible="{
      background: 'background.neutral.hovered',
      outline: 'none'
    }"
    :style="{
      background: getChatBackground // dynamic background style
    }"
  >
    <MpFlex
      flex="none"
      alignItems="center"
      justifyContent="center"
      width="7"
      height="7"
      rounded="full"
      bg="background.neutral.subtle"
    >
      <div
        v-if="isChecked || isHovered"
        :class="
          // set checkbox to center align
          css({
            display: 'flex',
            alignItems: 'center',
            '& > label': {
              gap: '0'
            }
          })
        "
      >
        <MpCheckbox v-model:is-checked="isChecked" @click="handleChecked" />
      </div>
      <MpIcon v-else size="sm" :name="iconName" />
    </MpFlex>
    <MpFlex gap="0.5" direction="column" width="full">
      <MpFlex gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          :weight="isUnread ? 'semiBold' : 'regular'"
          is-truncated
          v-tooltip="{
            label: senderName,
            placement: 'right'
          }"
          >{{ senderName }}</MpText
        >
        <MpBadge v-if="isShowSLA" for="tableStatus" type="critical" size="sm">
          <MpIcon
            name="timer"
            size="sm"
            color="inherit"
            :class="css({ height: '14px', width: '3', mr: '0.5' })"
          />
          {{ sla }}
        </MpBadge>
        <MpText v-else size="label-small" color="text.secondary" style="flex: none">{{
          timeStamp
        }}</MpText>
      </MpFlex>
      <MpFlex gap="1" justifyContent="space-between" alignItems="center" width="full">
        <MpText v-if="isShowReplies" color="text.secondary">↩︎</MpText>
        <MpIcon v-if="contentType !== 'text'" size="sm" :name="handleContentIcon()" />
        <MpText
          color="text.secondary"
          is-truncated
          v-tooltip="{
            label: content,
            placement: 'right'
          }"
          >{{ content }}</MpText
        >
        <MpBadge v-if="isUnread" for="indicator" type="critical" style="flex: none" />
      </MpFlex>
      <MpFlex gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          size="label-small"
          color="text.placeholder"
          is-truncated
          v-tooltip="{
            label: channelName,
            placement: 'right'
          }"
          >{{ channelName }}</MpText
        >
        <MpText
          v-if="status"
          size="overline"
          weight="semiBold"
          :style="{ '--mp-text-color': getStatusColor, textTransform: 'capitalize' }"
          >{{ status }}</MpText
        >
      </MpFlex>
      <MpFlex gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          size="overline"
          color="text.secondary"
          is-truncated
          v-tooltip="{
            label: tag,
            placement: 'right'
          }"
          >{{ tag }}</MpText
        >
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

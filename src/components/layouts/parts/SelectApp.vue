<script setup lang="ts">
  import {
    MpBadge,
    MpButton,
    MpIcon,
    MpPopover,
    MpPopoverContent,
    MpPopoverList,
    MpPopoverListItem,
    MpPopoverTrigger,
    MpText,
    css
  } from '@mekari/pixel3'
  import type { PropType } from 'vue'

  interface Item {
    id: string | number
    label: string
    isNew?: boolean
    isSelected?: boolean
  }
  const props = defineProps({
    modelValue: {
      type: Object as PropType<Item>
    },
    items: {
      type: Array as PropType<Item[]>
    }
  })

  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <MpPopover>
    <MpPopoverTrigger>
      <MpButton variant="ghost" right-icon="chevrons-down">
        {{ modelValue?.label }}
      </MpButton>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          width: '65'
        })
      "
    >
      <MpPopoverList>
        <MpText
          size="label-small"
          color="gray.400"
          :class="css({ width: 'full', py: '1', px: '3', letterSpacing: '2px' })"
          >SELECT APPS</MpText
        >
        <MpPopoverListItem
          v-for="data in props.items"
          :key="data.id"
          @click="emit('update:modelValue', data)"
        >
          <span
            :class="
              css({
                display: 'flex',
                alignItems: 'center',
                gap: 2
              })
            "
          >
            {{ data.label }}

            <MpBadge v-if="data.isNew">New</MpBadge>
          </span>
          <MpIcon v-if="data.isSelected" name="check" size="sm" />
        </MpPopoverListItem>
      </MpPopoverList>
    </MpPopoverContent>
  </MpPopover>
</template>

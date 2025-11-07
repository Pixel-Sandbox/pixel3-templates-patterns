<script setup lang="ts">
  import {
    MpButton,
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
    category: string
    childs: string[]
  }

  const props = defineProps({
    items: {
      type: Array as PropType<Item[]>,
      default: () => []
    }
  })
  const emit = defineEmits(['select'])

  const listItem = css({
    color: 'text.inverse.static',
    _hover: {
      background: 'background.brand.hovered'
    }
  })
</script>

<template>
  <MpPopover>
    <MpPopoverTrigger>
      <MpButton
        v-tooltip="'Quick action'"
        aria-label="quick action button"
        left-icon="add"
        variant="ghost"
      />
    </MpPopoverTrigger>

    <MpPopoverContent
      isDark
      :class="
        css({
          width: 'full',
          maxWidth: '56',
          backgroundColor: 'overlay',
          boxShadow: 'lg'
        })
      "
    >
      <MpPopoverList>
        <template v-for="group in props.items" :key="group.name">
          <div
            :class="
              css({
                px: 3,
                py: 2,
                w: 'full'
              })
            "
          >
            <MpText
              :class="
                css({
                  textAlign: 'left'
                })
              "
              color="gray.100"
            >
              {{ group.category }}
            </MpText>
          </div>

          <MpPopoverListItem
            v-for="item in group.childs"
            :key="item"
            :class="listItem"
            @click="emit('select', item)"
          >
            {{ item }}
          </MpPopoverListItem>
        </template>
      </MpPopoverList>
    </MpPopoverContent>
  </MpPopover>
</template>

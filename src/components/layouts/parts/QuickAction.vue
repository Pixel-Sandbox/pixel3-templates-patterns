<script setup lang="ts">
  import {
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

  const buttonStyle = css({
    cursor: 'pointer',
    height: '9.5',
    minWidth: '9.5',
    padding: '1.5',
    rounded: 'sm',
    transition: 'all 250ms ease 0s',
    _focus: {
      boxShadow: 'outer',
      outline: 'none'
    },
    _hover: {
      background: 'gray.25'
    }
  })

  const listItem = css({
    color: 'white',
    _hover: {
      background: 'blue.400'
    }
  })
</script>

<template>
  <MpPopover>
    <MpPopoverTrigger>
      <button
        v-tooltip="{
          label: 'Quick action',
          usePortal: true
        }"
        :class="buttonStyle"
      >
        <MpIcon name="add" size="md" />
      </button>
    </MpPopoverTrigger>

    <MpPopoverContent
      isDark
      :class="
        css({
          width: 'full',
          maxWidth: '56',
          backgroundColor: 'overlay',
          boxShadow: 'lg',
          borderWidth: '0px'
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

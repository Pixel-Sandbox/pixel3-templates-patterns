<script setup lang="ts">
  import type { PropType } from 'vue'
  import type { IconName } from '@mekari/pixel3'
  import {
    MpIcon,
    MpPopover,
    MpPopoverContent,
    MpPopoverList,
    MpPopoverListItem,
    MpPopoverTrigger,
    css
  } from '@mekari/pixel3'
  import { useRoute } from 'vue-router'
  import type { MenuChildItem } from '../types'
  import SidebarItem from './SidebarItem.vue'

  const props = defineProps({
    as: {
      type: String,
      default: 'div'
    },
    to: String,
    isActive: Boolean,
    icon: String as PropType<IconName>,
    label: String,
    isShowArrow: Boolean,
    isHideLabel: Boolean,
    items: {
      type: Array as PropType<MenuChildItem[]>,
      default: () => []
    }
  })

  const currentRoute = useRoute()
</script>

<template>
  <MpPopover trigger="hover" placement="right" usePortal>
    <MpPopoverTrigger>
      <SidebarItem v-bind="props" :isShowArrow="true" :isActive="props.isActive" />
    </MpPopoverTrigger>
    <MpPopoverContent
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
        <component
          :is="child.as"
          v-for="child in props.items"
          :key="child.id"
          :to="child.as === 'RouterLink' ? child.link : undefined"
          :href="child.as === 'a' ? child.link : undefined"
          :target="child.as === 'a' ? child.target : undefined"
          :class="
            css({
              display: 'inline-flex',
              width: 'full'
            })
          "
        >
          <MpPopoverListItem
            :class="
              css({
                color: 'background',
                _hover: {
                  background: 'background.brand.hovered'
                },
                _active: {
                  background: 'background.brand.hovered'
                }
              })
            "
            :data-active="currentRoute.path === child.link ? true : undefined"
          >
            {{ child.name }}

            <MpIcon v-if="child.isNewTab" name="newtab" size="sm" color="gray.400" />
          </MpPopoverListItem>
        </component>
      </MpPopoverList>
    </MpPopoverContent>
  </MpPopover>
</template>

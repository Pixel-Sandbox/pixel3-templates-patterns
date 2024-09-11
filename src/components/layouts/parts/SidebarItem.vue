<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { PropType } from 'vue'
import type { IconName } from '@mekari/pixel3'
import { MpIcon, MpText } from '@mekari/pixel3'
import { sva } from '@mekari/pixel3-styled-system/css'
import { useRoute } from 'vue-router'

const props = defineProps({
  as: {
    type: String as PropType<Component | string>,
    default: 'div'
  },
  to: String,
  href: String,
  target: String,
  isActive: Boolean,
  icon: String as PropType<IconName>,
  label: String,
  isShowArrow: Boolean,
  isHideLabel: Boolean
})

const sidebarItemClasses = sva({
  slots: ['parent', 'wrapper', 'root', 'icon', 'label', 'arrow'],
  base: {
    parent: {
      display: 'flex',
      p: 2,
      rounded: 'md',
      cursor: 'pointer',
      transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s'
    },
    wrapper: {
      display: 'flex',
      width: 'full',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    root: { display: 'flex', alignItems: 'center', gap: 2 },
    icon: { _groupHover: { color: 'blue.400' } },
    label: {
      whiteSpace: 'nowrap',
      opacity: 100,
      transition: 'opacity 300ms',
      '&[data-hide-label=true]': {
        opacity: 0
      },
      _groupHover: { color: 'blue.400' }
    },
    arrow: {
      opacity: 100,
      transition: 'opacity 300ms',
      '&[data-hide-arrow=true]': {
        opacity: 0
      }
    }
  },
  variants: {
    isActive: {
      true: {
        parent: { backgroundColor: 'blue.100' },
        icon: { color: 'blue.400' }
      }
    }
  }
})

const currentRoute = useRoute()

const isActive = computed(
  () => props.isActive || (props.to ? currentRoute.path === props.to : false)
)

const classes = computed(() => sidebarItemClasses({ isActive: isActive.value }))
</script>

<template>
  <component
    :is="props.as"
    :to="props.to"
    :href="props.href"
    :target="props.target"
    :class="['group', classes.parent]"
    v-bind="$attrs"
  >
    <div :class="classes.wrapper">
      <div :class="classes.root">
        <MpIcon
          :name="props.icon || 'empty'"
          :variant="isActive ? 'fill' : 'outline'"
          :class="classes.icon"
        />
        <MpText
          :class="classes.label"
          :weight="isActive ? 'semiBold' : 'regular'"
          :color="isActive ? 'blue.400' : 'dark'"
          :data-hide-label="props.isHideLabel || undefined"
        >
          {{ props.label }}
        </MpText>
      </div>
      <MpIcon
        v-if="props.isShowArrow"
        name="chevrons-right"
        :class="classes.arrow"
        :data-hide-arrow="props.isHideLabel || undefined"
      />
    </div>
  </component>
</template>

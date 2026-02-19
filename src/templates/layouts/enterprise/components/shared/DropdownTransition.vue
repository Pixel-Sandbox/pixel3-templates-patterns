<script setup lang="ts">
import { ref } from 'vue'
import { css } from '@mekari/pixel3'

export type DropdownAlign = 'left' | 'right'

/**
 * Props for DropdownTransition component
 */
interface DropdownTransitionProps {
  /** Horizontal alignment of the dropdown relative to trigger. Determines which side the dropdown anchors to */
  align?: DropdownAlign
  /** Minimum width of the dropdown content panel */
  minWidth?: string
}

const props = withDefaults(
  defineProps<DropdownTransitionProps>(),
  {
    align: 'left',
    minWidth: '200px'
  }
)

const isOpen = ref(false)

const wrapperStyles = css({
  position: 'relative',
  display: 'inline-block'
})

const dropdownStyles = css({
  position: 'absolute',
  top: '100%',
  pt: '1',
  zIndex: 'popover'
})

const dropdownContentStyles = css({
  bg: 'background.neutral',
  rounded: 'md',
  shadow: 'lg',
  borderWidth: '1px',
  borderColor: 'border.default',
  overflow: 'hidden'
})
</script>

<template>
  <div
    class="group"
    data-component="DropdownTransition"
    data-component-group="shared"
    :class="wrapperStyles"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <slot name="trigger" />

    <Transition name="dropdown">
      <div
        v-show="isOpen"
        :class="dropdownStyles"
        :style="{ [props.align]: 0, minWidth: props.minWidth }"
      >
        <div :class="dropdownContentStyles">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.dropdown-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

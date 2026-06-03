<template>
  <MpFlex
    ref="wrapperRef"
    id="floating-bulk-action-wrapper"
    alignItems="center"
    gap="3"
    width="fit-content"
    height="52px"
    px="4"
    rounded="md"
    bg="background.neutral.subtle"
    borderWidth="1px"
    borderColor="border.default"
    transition="background 250ms, border-color 250ms, box-shadow 250ms"
    shadow="sm"
    position="absolute"
    :_hover="{
      bg: 'background.neutral.subtle.hovered',
      borderColor: 'border.bold'
    }"
  >
    <MpButton
      v-if="!isDisableDrag"
      ref="handleRef"
      id="floating-bulk-action-drag-handle"
      left-icon="drag"
      variant="ghost"
      aria-label="Drag handler"
      :style="{
        cursor: 'grab'
      }"
    />
    <slot name="content">
      <MpFlex gap="4">
        <MpText weight="semiBold" is-truncate>Floating bulk actions</MpText>
        <MpTextlink>Text link</MpTextlink>
      </MpFlex>
    </slot>
    <MpDivider
      orientation="vertical"
      :class="
        css({
          height: '28px',
          mx: '1'
        })
      "
    />
    <slot name="actions">
      <MpButtonGroup>
        <MpButton variant="secondary">Action 1</MpButton>
        <MpButton variant="primary">Action 2</MpButton>
      </MpButtonGroup>
    </slot>
    <MpButton
      v-tooltip="{
        label: closeButtonTooltip,
        placement: 'right'
      }"
      id="floating-bulk-action-close-button"
      left-icon="close"
      variant="ghost"
      aria-label="Drag handle"
      @click="$emit('close')"
    />
  </MpFlex>
</template>

<script setup lang="ts">
  import {
    css,
    MpFlex,
    MpButton,
    MpButtonGroup,
    MpText,
    MpTextlink,
    MpDivider
  } from '@mekari/pixel3'
  import { ref, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue'
  import { Draggable } from '@neodrag/vanilla'

  const props = defineProps({
    closeButtonTooltip: {
      type: String,
      default: 'Close'
    },
    isDisableDrag: {
      type: Boolean,
      default: false
    },
    bottomOffest: {
      type: Number,
      default: 40
    }
  })

  const wrapperRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
  const handleRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
  let draggableInstance: Draggable | null = null

  onMounted(() => {
    // Initialize draggable after component is mounted
    if (wrapperRef.value) {
      const element = (wrapperRef.value as ComponentPublicInstance)?.$el || wrapperRef.value
      const parent = element.parentElement

      // Calculate center bottom position relative to parent
      const elementWidth = element.offsetWidth
      const elementHeight = element.offsetHeight
      const parentWidth = parent?.offsetWidth || window.innerWidth
      const parentHeight = parent?.offsetHeight || window.innerHeight

      // Center horizontally, position at bottom with offset
      const x = (parentWidth - elementWidth) / 2
      const y = parentHeight - elementHeight - props.bottomOffest

      draggableInstance = new Draggable(element, {
        handle: !props.isDisableDrag
          ? (handleRef.value as ComponentPublicInstance)?.$el || handleRef.value
          : undefined,
        axis: 'both',
        defaultPosition: { x, y },
        bounds: 'parent',
        disabled: props.isDisableDrag
      })
    }
  })

  onUnmounted(() => {
    // Cleanup draggable instance
    if (draggableInstance) {
      draggableInstance.destroy()
      draggableInstance = null
    }
  })
</script>

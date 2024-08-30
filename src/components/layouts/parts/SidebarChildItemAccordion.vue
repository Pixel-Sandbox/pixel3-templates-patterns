<script setup lang="ts">
  import { css, MpCollapse, MpIcon, MpText } from '@mekari/pixel3'
  import { ref } from 'vue'

  const props = defineProps({
    as: String,
    to: String,
    isActive: Boolean,
    defaultIsOpen: Boolean
  })

  const isOpen = ref(props.defaultIsOpen || false)

  function onToggle() {
    isOpen.value = !isOpen.value
  }
</script>

<template>
  <div
    @click="onToggle"
    :class="
      css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'md',
        p: '2',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
        background: props.isActive ? 'blue.100' : 'transparent',
        color: props.isActive ? 'blue.400' : 'dark',
        fontWeight: props.isActive ? 'semiBold' : 'regular',
        _hover: {
          color: 'blue.400',
          cursor: 'pointer'
        }
      })
    "
  >
    <MpText
      :class="
        css({
          whiteSpace: 'nowrap',
          color: 'inherit',
          lineHeight: '3xl',
          fontWeight: props.isActive ? 'semiBold' : 'regular'
        })
      "
    >
      <slot name="header" />
    </MpText>

    <MpIcon
      name="caret-down"
      :style="{
        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
        transition: 'transform 0.2s',
        transformOrigin: 'center'
      }"
    />
  </div>

  <MpCollapse :isOpen="isOpen">
    <slot name="content" />
  </MpCollapse>
</template>

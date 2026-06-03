<script setup lang="ts">
import { css, MpInputGroup, MpInputLeftAddon, MpInput, MpIcon } from '@mekari/pixel3'

/**
 * Props for SearchInput component
 */
interface SearchInputProps {
  /** Input placeholder text */
  placeholder?: string
  /** Input width */
  width?: string
  /** Input id for accessibility */
  id?: string
}

const props = withDefaults(defineProps<SearchInputProps>(), {
  placeholder: 'Search...',
  width: '296px'
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <MpInputGroup
    :id="id ? `${id}-group` : undefined"
    data-component="SearchInput"
    data-component-group="shared"
  >
    <MpInputLeftAddon
      :id="id ? `${id}-addon` : undefined"
      :class="css({ bg: 'transparent', borderColor: 'border.default' })"
    >
      <MpIcon name="search" size="sm" />
    </MpInputLeftAddon>
    <MpInput
      :id="id"
      v-model="model"
      :placeholder="placeholder"
      :class="css({
        borderColor: 'border.default',
        borderRadius: 'full',
        width: props.width
      })"
    />
  </MpInputGroup>
</template>

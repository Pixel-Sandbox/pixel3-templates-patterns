<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { css, MpIcon, MpText } from '@mekari/pixel3'

/**
 * Props for SearchInput component
 */
interface SearchInputProps {
  /** Current input value (v-model) */
  modelValue: string
  /** Placeholder text shown when input is empty */
  placeholder?: string
}

const props = withDefaults(
  defineProps<SearchInputProps>(),
  {
    placeholder: 'Search...',
  }
)

const emit = defineEmits<{
  /** Emitted when input value changes */
  'update:modelValue': [value: string]
  /** Emitted when clear button is clicked */
  clear: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// Focus input when mounted
onMounted(() => {
  inputRef.value?.focus()
})

// Styles
const wrapperStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  px: '4',
  py: '3',
})

const searchIconStyles = css({
  flexShrink: 0,
})

const inputStyles = css({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: 'md',
  color: 'text.default',
  bg: 'transparent',
  '&::placeholder': {
    color: 'text.placeholder',
  },
})

const clearButtonStyles = css({
  flexShrink: 0,
  color: 'text.secondary',
  cursor: 'pointer',
  bg: 'transparent',
  border: 'none',
  p: '0',
  _hover: {
    color: 'text.link',
  },
})
</script>

<template>
  <div
    data-component="SearchInput"
    data-component-group="universal-search"
    :class="wrapperStyles"
  >
    <MpIcon name="search" size="sm" color="icon.default" :class="searchIconStyles" />

    <input
      ref="inputRef"
      type="text"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :class="inputStyles"
      @input="handleInput"
    />

    <button
      v-if="props.modelValue"
      type="button"
      :class="clearButtonStyles"
      @click="handleClear"
    >
      <MpText size="label" color="text.secondary">Clear</MpText>
    </button>
  </div>
</template>

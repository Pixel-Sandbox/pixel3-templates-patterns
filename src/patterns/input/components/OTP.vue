<script setup lang="tsx">
import { MpInput, css } from '@mekari/pixel3'
import type { PropType } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String as PropType<string>, default: '' },
  digits: { type: Number as PropType<number>, default: 6 },
  type: {
    type: String as PropType<'number' | 'text' | 'password'>,
    default: 'text',
    validator(value: string) {
      return ['number', 'text', 'password'].includes(value)
    },
  },
})
const emit = defineEmits(['update:modelValue', 'completed'])

const inputNode = ref()
const innerValue = ref(Array.from({ length: props.digits }).fill('') as string[])
const currentFocus = ref()

const isCompleted = computed(() => innerValue.value.every(item => item !== ''))

function handleInput() {
  if (!isCompleted.value)
    handleForceFocus()
}
function handleKeydown(e: KeyboardEvent) {
  if (
    e.code === 'Backspace'
    && !innerValue.value[currentFocus.value]
    && currentFocus.value !== 0
  ) {
    const result = innerValue.value.map((item, index) =>
      index === currentFocus.value - 1 ? '' : item,
    )

    innerValue.value = result
    handleForceFocus()
  }
}
function handleFocus() {
  if (!isCompleted.value) {
    // Set focus to empty input box.
    handleForceFocus()
  }
  else {
    // Set focus to last input box.
    inputNode.value[props.digits - 1].$el.children[0].focus()
  }
}
function handleForceFocus() {
  const position = innerValue.value.findIndex(item => item === '')
  if (position >= 0) {
    currentFocus.value = position
    inputNode.value[position].$el.children[0].focus()
  }
}

const inputStyle = css({
  width: '36px',
  height: '48px',
  px: 1,
  minWidth: 'auto',
  textAlign: 'center',
  fontSize: 'xl',
  fontWeight: 'semiBold',
})

// Utils
function valueToArray(value: string, digits: number) {
  const sources
    = props.type === 'number'
      ? Array.from(String(value))
      : Array.from(String(value).toUpperCase())

  // eslint-disable-next-line unicorn/no-new-array
  const target = new Array(digits).fill('')
  const result = target.map((item, index) => sources[index] || item)

  return result
}
function arrayToValue(value: string[]) {
  return String(value.join(''))
}

watch(
  () => props.modelValue,
  (newValue: any) => {
    innerValue.value = valueToArray(newValue, props.digits)
  },
)

watch(
  () => innerValue.value,
  () => {
    emit('update:modelValue', arrayToValue(innerValue.value) || '')
  },
)

watch(
  () => isCompleted.value,
  (newValue: any) => {
    if (newValue) {
      emit('completed', arrayToValue(innerValue.value))
      nextTick(() => {
        handleFocus()
      })
    }
  },
)
</script>

<template>
  <div
    :class="css({
      display: 'inline-flex',
      gap: 4,
    })"
  >
    <MpInput
      v-for="(_, index) in props.digits"
      :key="index" ref="inputNode" v-model="innerValue[index]" class="hide-arrow-input-number"
      :class="inputStyle" maxlength="1" :type="props.type" @input="handleInput" @focus="handleFocus"
      @keydown="handleKeydown"
    />
  </div>
</template>

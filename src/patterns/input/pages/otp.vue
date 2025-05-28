<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import OTP from '../components/OTP.vue'

  const otpValue = ref()

  function onCompleted(val: string) {
    console.log('COMPLETED: ', val)
  }

  function handlePaste(event: any) {
    event.preventDefault()

    const pasteData = (event.clipboardData || window.Clipboard).getData('text')
    console.log('PASTE :', pasteData)
    otpValue.value = pasteData
  }

  onMounted(() => {
    window.addEventListener('paste', handlePaste)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('paste', handlePaste)
  })
</script>

<template>
  <div style="padding: 16px">
    <OTP v-model="otpValue" :digits="6" @completed="onCompleted" />
  </div>
</template>

<template>
  <MpFlex
    v-if="showBlankState"
    :class="
      css({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '6'
      })
    "
  >
    <img
      :class="css({ height: '240px', width: 'auto' })"
      :src="variantToImage.src"
      :alt="variantToImage.alt"
    />

    <MpText size="h3" :class="css({ fontWeight: 'semiBold', marginBottom: '1' })">
      {{ title }}
    </MpText>

    <MpText :class="css({ color: 'gray.600' })">
      {{ subtitle }}
    </MpText>
  </MpFlex>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { css, MpFlex, MpText } from '@mekari/pixel3'

  // Import images as URLs from public directory
  import NotNotifImage from '/illustrations/no_notif.png'
  import AllReadImage from '/illustrations/all_read.png'
  import NotFoundImage from '/illustrations/not_found.png'

  type BlankStateProps = {
    showBlankState: boolean
    variant: 'no-notification' | 'all-read' | 'not-found'
    title: string
    subtitle: string
  }

  const props = withDefaults(defineProps<BlankStateProps>(), {
    variant: 'no-notification'
  })

  const variantToImage = computed(() => {
    switch (props.variant) {
      case 'no-notification':
        return {
          src: NotNotifImage,
          alt: 'No notification illustration'
        }
      case 'all-read':
        return {
          src: AllReadImage,
          alt: 'All read illustration'
        }
      case 'not-found':
        return {
          src: NotFoundImage,
          alt: 'Not found illustration'
        }
      default:
        return {
          src: NotNotifImage,
          alt: 'No notification illustration'
        }
    }
  })
</script>

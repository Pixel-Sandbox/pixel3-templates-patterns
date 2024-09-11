<script setup lang="ts">
import { css, MpText, MpIcon, MpFlex } from '@mekari/pixel3'

const props = defineProps({
  as: {
    type: String,
    default: 'div'
  },
  title: [String],
  description: [String],
  icon: [String]
})
</script>

<template>
  <component
    :is="props.as"
    :class="[
      'group',
      css({
        display: 'flex',
        borderRadius: 'sm',
        padding: '2',
        minHeight: '20',
        transition: 'all 200ms ease',
        _hover: {
          backgroundColor: 'gray.50',
          color: 'blue.400',
          cursor: 'pointer'
        }
      })
    ]"
  >
    <div
      :class="
        css({
          display: 'flex',
          gap: 4
        })
      "
    >
      <div>
        <div
          :class="
            css({
              borderWidth: '1px',
              borderColor: 'gray.50',
              borderRadius: 'md',
              padding: '2',
              _groupHover: {
                backgroundColor: 'white'
              }
            })
          "
        >
          <MpIcon :name="icon" />
        </div>
      </div>

      <MpFlex
        :class="
          css({
            display: 'flex',
            flexDirection: 'column',
            flex: '1'
          })
        "
      >
        <MpText size="body" weight="semiBold">
          {{ title }}
        </MpText>
        <MpText size="label" color="gray.600">
          {{ description }}
        </MpText>
      </MpFlex>
    </div>
  </component>
</template>

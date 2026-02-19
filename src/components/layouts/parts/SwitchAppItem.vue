<script setup lang="ts">
  import { MpFlex, MpIcon, MpText, css } from '@mekari/pixel3'

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
    class="group"
    :class="[
      css({
        display: 'flex',
        borderRadius: 'sm',
        padding: '2',
        minHeight: '20',
        transition: 'all 200ms ease',
        _hover: {
          backgroundColor: 'background.neutral.subtle',
          color: 'background.brand.selected',
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
              borderColor: 'border.default',
              borderRadius: 'md',
              padding: '2',
              _groupHover: {
                backgroundColor: 'background.neutral'
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
        <MpText size="label" color="text.secondary">
          {{ description }}
        </MpText>
      </MpFlex>
    </div>
  </component>
</template>

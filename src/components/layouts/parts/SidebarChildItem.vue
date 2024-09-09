<script setup lang="ts">
  import { css, MpText } from '@mekari/pixel3'
  import { cva } from '@mekari/pixel3-styled-system/css'
  import type { PropType } from 'vue'

  const props = defineProps({
    as: String,
    to: String,
    isActive: Boolean,
    variant: {
      type: String as PropType<'item' | 'accordionItem'>,
      default: 'item'
    },
    count: String,
  })

  const classes = cva({
    base: {
      cursor: 'pointer',
      flex: '1',
      borderRadius: 'md',
      p: '2',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    variants: {
      variant: {
        item: {},
        accordionItem: {}
      },
      isActive: {
        true: {
          fontWeight: 'semiBold'
        },
        false: {
          fontWeight: 'regular'
        }
      }
    },
    compoundVariants: [
      {
        variant: 'item',
        isActive: false,
        css: {
          background: 'transparent',
          color: 'dark',
          _hover: {
            color: 'blue.400'
          }
        }
      },
      {
        variant: 'item',
        isActive: true,
        css: {
          background: 'blue.100',
          color: 'blue.400'
        }
      },

      {
        variant: 'accordionItem',
        isActive: false,
        css: {
          background: 'transparent',
          color: 'gray.600',
          _hover: {
            color: 'blue.400'
          }
        }
      },
      {
        variant: 'accordionItem',
        isActive: true,
        css: {
          background: 'transparent',
          color: 'dark'
        }
      }
    ]
  })
</script>

<template>
  <component
    :is="props.as || 'div'"
    :to="props.to"
    :class="
      classes({
        variant: props.variant,
        isActive: props.isActive
      })
    "
  >
    <MpText
      :class="
        css({ color: 'inherit', fontWeight: 'inherit', minWidth: '0' })
      "
    >
      <slot />
    </MpText>
    <MpText v-if="count" as="span" color="gray.600" :class="css({
      marginLeft: '2'
    })">{{ count }}</MpText>
  </component>
</template>

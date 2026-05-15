<!--
  @description
  A visual status indicator for list or card items (e.g. transactional vs non-transactional).
  Use variants (transactional, nonTransactional, warning, danger) to show state. Often paired with progress or icon.
-->
<script setup lang="ts">
import { MpProgress, MpIcon, MpText, css } from '@mekari/pixel3'
import { cva } from '@mekari/pixel3-styled-system/css'

const beakerWrapper = cva({
  base: {
    display: 'flex',
    p: 2,
    gap: 2,
    rounded: 'md',
    alignItems: 'center',
    borderWidth: '1px',
    borderColor: 'white',
    transition: 'all 250ms',
    cursor: 'pointer'
  },
  variants: {
    variant: {
      transactional: {
        bg: 'background',
        _hover: {
          borderWidth: '1px',
          borderColor: 'gray.100'
        }
      },
      nonTransactional: {
        bg: 'blue.50',
        _hover: {
          borderWidth: '1px',
          borderColor: 'blue.400'
        }
      },
      warning: {
        bg: 'orange.50',
        _hover: {
          borderWidth: '1px',
          borderColor: 'orange.400'
        }
      },
      danger: {
        bg: 'red.50',
        _hover: {
          borderWidth: '1px',
          borderColor: 'red.400'
        }
      }
    }
  },
  defaultVariants: {
    variant: 'transactional'
  }
})
</script>

<template>
  <div :class="css({ display: 'flex' })">
    <div :class="css({ p: 4, display: 'flex', flexDirection: 'column', gap: 4 })">
      <div>
        <button :class="beakerWrapper({ variant: 'transactional' })">
          <MpProgress value="75" variant="circular" size="sm" color="lime.400" />

          <MpText>
            Sisa kuota faktur

            <MpText as="span" weight="semiBold"> 750 </MpText>
          </MpText>

          <MpIcon name="chevrons-right" size="sm" />
        </button>
      </div>

      <div>
        <button :class="beakerWrapper({ variant: 'warning' })">
          <MpProgress value="45" variant="circular" size="sm" color="amber.400" />

          <MpText>
            Sisa kuota faktur

            <MpText as="span" weight="semiBold"> 120 </MpText>
          </MpText>

          <MpIcon name="chevrons-right" size="sm" />
        </button>
      </div>

      <div>
        <button :class="beakerWrapper({ variant: 'danger' })">
          <MpProgress value="10" variant="circular" size="sm" color="rose.400" />

          <MpText>
            Sisa kuota faktur

            <MpText as="span" weight="semiBold"> 50 </MpText>
          </MpText>

          <MpIcon name="chevrons-right" size="sm" />
        </button>
      </div>

      <div>
        <button :class="beakerWrapper({ variant: 'danger' })">
          <MpIcon name="error" size="sm" variant="duotone" />

          <MpText>
            Sisa kuota faktur

            <MpText as="span" weight="semiBold"> 0 </MpText>
          </MpText>

          <MpIcon name="chevrons-right" size="sm" />
        </button>
      </div>

      <div>
        <button :class="beakerWrapper({ variant: 'nonTransactional' })">
          <MpIcon name="people" size="sm" />

          <MpText>
            Sisa kuota faktur

            <MpText as="span" weight="semiBold"> 5/5 </MpText>
          </MpText>

          <MpIcon name="chevrons-right" size="sm" />
        </button>
      </div>
    </div>
  </div>
</template>

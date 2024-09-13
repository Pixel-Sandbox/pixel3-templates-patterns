<script setup lang="ts">
import type { PropType } from 'vue'
import { MpPopoverList, MpPopoverListItem, css } from "@mekari/pixel3";

type emojis = {
  emoji: string
}
const props = defineProps({
  data: Array as PropType<emojis[]>
});

const emit = defineEmits(["click"]);

function onClick(value: { emoji: string }) {
  emit("click", value.emoji);
}
</script>

<template>
  <MpPopoverList
    :class="
      css({
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '2',
      })
    "
    wrap="wrap"
    gap="2"
  >
    <MpPopoverListItem
      v-for="item in props?.data"
      :class="
        css({
          width: '36px',
          height: '36px',
          padding: '0px',
          rounded: 'sm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& div': {
            width: 'fit-content',
            fontSize: '20px',
          },
        })
      "
      @click="onClick(item)"
      >{{ item.emoji }}</MpPopoverListItem
    >
  </MpPopoverList>
</template>

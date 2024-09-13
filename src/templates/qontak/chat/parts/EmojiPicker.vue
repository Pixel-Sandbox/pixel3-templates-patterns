<script setup lang="ts">
import { ref } from "vue";
import {
  css,
  MpFlex,
  MpButton,
  MpIcon,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpInput,
  MpInputGroup,
  MpInputLeftAddon,
  MpTabs,
  MpTabList,
  MpTab,
  MpTabPanels,
  MpTabPanel,
} from "@mekari/pixel3";

import EmojiList from "./EmojiList.vue";
import EmojiData from "./emoji.json";

const emoji = ref("🚨");

function handleSelectEmoji(value: string) {
  emoji.value = value;
}
</script>

<template>
  <MpPopover
    id="popover-emoji-picker"
    :is-keep-alive="false"
    :is-close-on-select="true"
  >
    <MpPopoverTrigger>
      <MpButton variant="secondary" :class="css({ width: '38px' })">{{
        emoji
      }}</MpButton>
    </MpPopoverTrigger>
    <MpPopoverContent
      :class="
        css({
          p: 4,
          width: '290px',
          maxWidth: '290px',
          maxHeight: '300px',
          overflowY: 'auto',
        })
      "
    >
      <MpInputGroup size="md">
        <MpInputLeftAddon>
          <MpIcon name="search" size="sm" />
        </MpInputLeftAddon>
        <MpInput placeholder="Search emoji" is-clearable />
      </MpInputGroup>

      <MpFlex direction="column" gap="4">
        <MpTabs>
          <MpTabList
            :class="
              css({
                '& div': {
                  mb: '0',
                  whiteSpace: 'nowrap',
                },
              })
            "
          >
            <MpTab>{{ EmojiData[0].name }}</MpTab>
            <MpTab>{{ EmojiData[1].name }}</MpTab>
            <MpTab>{{ EmojiData[2].name }}</MpTab>
            <MpTab>{{ EmojiData[3].name }}</MpTab>
            <MpTab>{{ EmojiData[4].name }}</MpTab>
            <MpTab>{{ EmojiData[5].name }}</MpTab>
            <MpTab>{{ EmojiData[6].name }}</MpTab>
            <MpTab>{{ EmojiData[7].name }}</MpTab>
            <MpTab>{{ EmojiData[8].name }}</MpTab>
          </MpTabList>

          <MpTabPanels :is-keep-alive="true">
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[0].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[1].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[2].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[3].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[4].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[5].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[6].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[7].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList
                :data="EmojiData[8].emojis"
                @click="handleSelectEmoji"
              />
            </MpTabPanel>
          </MpTabPanels>
        </MpTabs>
      </MpFlex>
    </MpPopoverContent>
  </MpPopover>
</template>

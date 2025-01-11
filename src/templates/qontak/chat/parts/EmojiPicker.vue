<script setup lang="ts">
import { ref } from 'vue'
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
  MpTabPanel
} from '@mekari/pixel3'

import EmojiList from './EmojiList.vue'
import EmojiData from './emoji.json'

const emoji = ref('😀')

const recentlyUsedEmoji = ref([
  {
    'emoji': '😀',
    'skin_tone_support': false,
    'name': 'grinning face',
    'slug': 'grinning_face',
    'unicode_version': '1.0',
    'emoji_version': '1.0'
  },
  {
    'emoji': '😃',
    'skin_tone_support': false,
    'name': 'grinning face with big eyes',
    'slug': 'grinning_face_with_big_eyes',
    'unicode_version': '0.6',
    'emoji_version': '0.6'
  },
  {
    'emoji': '🥳',
    'skin_tone_support': false,
    'name': 'partying face',
    'slug': 'partying_face',
    'unicode_version': '11.0',
    'emoji_version': '11.0'
  }
])

function handleSelectEmoji(value: string) {
  emoji.value = value
}
</script>

<template>
  <MpPopover id="popover-emoji-picker" :is-keep-alive="false" :is-close-on-select="true">
    <MpPopoverTrigger>
      <MpButton variant="secondary" :class="css({ width: '38px' })">{{ emoji }}</MpButton>
    </MpPopoverTrigger>
    <MpPopoverContent
      :class="
      css({
        p: 4,
        width: '290px',
        maxWidth: '290px',
        maxHeight: '300px',
      })"
    > 
      <MpFlex direction="column" gap="2" >
        <MpInputGroup size="md">
        <MpInputLeftAddon>
          <MpIcon name="search" size="sm" />
        </MpInputLeftAddon>
        <MpInput placeholder="Search emoji" is-clearable  />
      </MpInputGroup>
        <MpTabs >
          <MpTabList
            :class="
              css({
                '& div': {
                  mb: '0',
                  whiteSpace: 'nowrap'
                }
              })
            "
          >
            <MpTab>Recently Used</MpTab>  
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

          <MpTabPanels 
            is-keep-alive="true" 
            :class="
              css({
                height: '150px',
                overflowY: 'auto'
            })"
          >
            <MpTabPanel>
              <EmojiList :data="recentlyUsedEmoji" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[0].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[1].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[2].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[3].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[4].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[5].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[6].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[7].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
            <MpTabPanel>
              <EmojiList :data="EmojiData[8].emojis" @click="handleSelectEmoji" />
            </MpTabPanel>
          </MpTabPanels>
        </MpTabs>
      </MpFlex>
    </MpPopoverContent>
  </MpPopover>
</template>

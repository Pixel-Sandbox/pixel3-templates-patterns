<script setup lang="ts">
  import { ref } from 'vue'
  import { MpText, MpFlex, MpSelect, MpButton, MpImage, css } from '@mekari/pixel3'
  import { usePixelLayout } from '@/components/layouts/composables'
  import BaseLayout from '../parts/BaseLayout.vue'
  import ChatList from '../parts/ChatList.vue'

  // DUMMY DATA
  import { CHAT_LIST_DATA } from '../data/chat'

  const { pixelContentAttrs } = usePixelLayout()

  const title = ref('All inboxes')
  const select = ref('newest')
  const chatIdClicked = ref('')

  function onChatClick(id: string) {
    chatIdClicked.value = id
  }

  function onChatChecked(id: string, isChecked: boolean) {
    console.log(`${id} is checked:`, isChecked)
  }

  function onChatHovered(id: string, isHovered: boolean) {
    console.log(`${id} is hovered:`, isHovered)
  }
</script>

<template>
  <BaseLayout :is-show-child-menu="true">
    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <div
        :class="
          css({
            display: 'flex',
            bg: 'background.surface',
            borderLeftWidth: '1px',
            borderColor: 'border.default',
            height: 'calc(100vh - var(--pixel-navbar-height))',
            overflow: 'hidden'
          })
        "
      >
        <MpFlex
          direction="column"
          width="288px"
          minWidth="288px"
          borderRightWidth="1"
          borderColor="border.default"
          bg="background.neutral"
        >
          <MpFlex
            alignItems="center"
            height="60px"
            px="4"
            borderBottomWidth="1"
            borderColor="border.default"
          >
            <MpText size="h2">{{ title }}</MpText>
          </MpFlex>
          <MpFlex
            gap="2"
            alignItems="center"
            height="60px"
            px="4"
            borderBottomWidth="1"
            borderColor="border.default"
          >
            <MpSelect v-model="select">
              <option value="newest">Newest</option>
              <option value="oldesst">Oldest</option>
              <option value="auto">Auto</option>
            </MpSelect>
            <MpButton left-icon="done" variant="ghost" />
            <MpButton left-icon="empty" variant="ghost" />
            <MpButton left-icon="filter" variant="ghost" />
          </MpFlex>
          <MpFlex
            as="ul"
            direction="column"
            overflow="auto"
            height="calc(100vh - var(--pixel-navbar-height) - 120px)"
          >
            <ChatList
              v-for="(item, index) in CHAT_LIST_DATA"
              v-bind="item"
              :key="index"
              :id="`chat-list-${index}`"
              :is-active="`chat-list-${index}` === chatIdClicked"
              @click="onChatClick"
              @checked="onChatChecked"
              @hover="onChatHovered"
            />
          </MpFlex>
        </MpFlex>
        <MpFlex justifyContent="center" alignItems="center" width="full">
          <MpFlex direction="column" alignItems="center" gap="1" width="376px">
            <MpImage
              src="https://cdn.mekari.design/illustration/blank-slate/StartChat_PI_L_01.png"
              layout="fixed"
              :width="288"
              :height="240"
            />
            <MpText size="h3">Conversation will appear here</MpText>
            <MpText color="text.secondary"
              >Please select a conversation from the list on the left first.</MpText
            >
          </MpFlex>
        </MpFlex>
      </div>
    </main>
  </BaseLayout>
</template>

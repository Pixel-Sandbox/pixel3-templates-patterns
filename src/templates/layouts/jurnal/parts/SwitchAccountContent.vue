<script setup lang="ts">
  import { ref } from 'vue'
  import {
    MpAvatar,
    MpBadge,
    MpButton,
    MpDivider,
    MpFlex,
    MpIcon,
    MpPopoverList,
    MpPopoverListItem,
    MpText,
    css
  } from '@mekari/pixel3'
  import { sva } from '@mekari/pixel3-styled-system/css'
  import { usePixelLayout } from '@/components/layouts/composables/usePixelLayout'
  import { useAppThemeSwitcher } from '@/components/layouts/composables/useAppThemeSwitcher'

  const props = defineProps({
    onClosePopover: {
      type: Function
    }
  })

  const { accountInformation } = usePixelLayout()
  const { setTheme, currentTheme } = useAppThemeSwitcher()

  const profileStyle = sva({
    slots: ['root', 'content', 'avatar'],
    base: {
      root: {
        backgroundColor: 'background.neutral',
        borderBottomWidth: '1px',
        borderColor: 'border.default',
        borderTopRadius: 'md',
        py: 4
      },
      content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      avatar: {
        marginBottom: '2'
      }
    }
  })
  const footerStyle = sva({
    slots: ['root', 'font'],
    base: {
      root: {
        display: 'flex',
        gap: '3',
        flexWrap: 'wrap',
        px: '3',
        py: '4'
      },
      font: {
        fontSize: 'xs',
        color: 'gray.600'
      }
    }
  })
  const popoverHeaderStyle = css({
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    py: 2,
    px: 3,
    roundedTop: 'md',
    backgroundColor: 'background.neutral.subtle',
    borderBottomWidth: '1px',
    borderColor: 'border.default'
  })
  const profileClass = profileStyle()
  const footerClass = footerStyle()

  type ContentType = 'parent' | 'companyList' | 'changeLanguage' | 'switchAccount' | 'switchThemes'
  const showToggleContent = ref<ContentType>('parent')

  function onToggleContent(content: ContentType) {
    showToggleContent.value = content
  }
</script>

<template>
  <div>
    <template v-if="showToggleContent === 'parent'">
      <div :class="profileClass.root">
        <div :class="profileClass.content">
          <MpAvatar
            :class="profileClass.avatar"
            :name="accountInformation.fullName"
            :src="accountInformation.userPhoto"
            size="lg"
          />
          <MpText weight="semiBold">
            {{ accountInformation.fullName }}
          </MpText>
          <MpText color="gray.600">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          Account settings
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          Company info

          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('companyList')">
          Company list
        </MpPopoverListItem>
        <MpPopoverListItem @click="onToggleContent('changeLanguage')">
          Change language
          <MpText color="gray.600"> English </MpText>
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchAccount')">
          Switch account
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchThemes')">
          Themes
        </MpPopoverListItem>
        <MpPopoverListItem>Sign out</MpPopoverListItem>
      </MpPopoverList>

      <div :class="footerClass.root">
        <MpText :class="footerClass.font"> Privacy </MpText>
        <MpText :class="footerClass.font"> Terms of Use </MpText>
        <MpText :class="footerClass.font"> About Mekari Account </MpText>
        <MpText :class="footerClass.font"> Mekari © 2022 </MpText>
      </div>
    </template>

    <template v-if="showToggleContent === 'companyList'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold"> Daftar perusahaan </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          See the company list

          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem>
          <div>
            <MpText weight="semiBold"> Company name 1 </MpText>
            <MpText color="gray.600"> Company id : 377750 </MpText>
          </div>

          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem>
          <div>
            <MpText> Company name 2 </MpText>
            <MpText color="gray.600"> Company id : 377751 </MpText>
          </div>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <div>
            <MpText> Company name 3 </MpText>
            <MpText color="gray.600"> Company id : 377752 </MpText>
          </div>
        </MpPopoverListItem>

        <button
          :class="
            css({
              cursor: 'pointer',
              width: 'full',
              textAlign: 'center',
              pt: 2,
              borderTopWidth: '1px',
              borderColor: 'border.default',
              color: 'text.link',
              _hover: {
                color: 'text.link'
              }
            })
          "
        >
          + Create new company
        </button>
      </MpPopoverList>
    </template>

    <template v-if="showToggleContent === 'changeLanguage'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold"> Change language </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          <MpText weight="semiBold"> English </MpText>

          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText>Indonesia</MpText>
        </MpPopoverListItem>
      </MpPopoverList>
    </template>

    <template v-if="showToggleContent === 'switchAccount'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold"> Switch account </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          <MpText weight="semiBold"> dimas.raka@mekari.com </MpText>

          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> sastra.nababan@mekari.com </MpText>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> dirga.prakhesa@mekari.com </MpText>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> ahmad.zakiy@mekari.com </MpText>
        </MpPopoverListItem>

        <button
          :class="
            css({
              cursor: 'pointer',
              width: 'full',
              textAlign: 'center',
              pt: 2,
              borderTopWidth: '1px',
              borderColor: 'border.default',
              color: 'text.link',
              _hover: {
                color: 'text.link'
              }
            })
          "
        >
          + Add new account
        </button>
      </MpPopoverList>
    </template>

    <template v-if="showToggleContent === 'switchThemes'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold"> Themes </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem
          :is-active="currentTheme === 'auto'"
          @click="[setTheme('auto'), props.onClosePopover?.()]"
        >
          <MpText> Auto (System settings) </MpText>

          <MpIcon v-if="currentTheme === 'auto'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'light'"
          @click="[setTheme('light'), props.onClosePopover?.()]"
        >
          <MpText> Light </MpText>

          <MpIcon v-if="currentTheme === 'light'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'dark'"
          @click="[setTheme('dark'), props.onClosePopover?.()]"
        >
          <MpFlex align="center" gap="2">
            Dark

            <MpBadge type="critical" size="sm"> BETA </MpBadge>
          </MpFlex>

          <MpIcon v-if="currentTheme === 'dark'" name="check" size="sm" />
        </MpPopoverListItem>
      </MpPopoverList>
    </template>
  </div>
</template>

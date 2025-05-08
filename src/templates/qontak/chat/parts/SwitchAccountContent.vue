<script setup lang="ts">
  import { ref } from 'vue'
  import {
    css,
    MpAvatar,
    MpBadge,
    MpText,
    MpPopoverList,
    MpPopoverListItem,
    MpDivider,
    MpIcon,
    MpButton,
    MpFlex
  } from '@mekari/pixel3'
  import { sva } from '@mekari/pixel3-styled-system/css'
  import { usePixelLayout } from '@/components/layouts/composables/usePixelLayout'
  import { useAppThemeSwitcher } from '@/components/layouts/composables/useAppThemeSwitcher'
  import { ButtonPopover } from '@/components/layouts/parts'

  defineProps({
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
        backgroundColor: 'background.surface',
        borderBottomWidth: 'sm',
        borderColor: 'border.default',
        borderTopRadius: 'md',
        py: '4'
      },
      content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      avatar: {
        mb: '2'
      }
    }
  })
  const footerStyle = sva({
    slots: ['root', 'font'],
    base: {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3',
        px: '3',
        py: '4'
      },
      font: {
        fontSize: 'xs',
        color: 'text.secondary'
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
    backgroundColor: 'background.surface',
    borderBottomWidth: 'sm',
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
          <MpText weight="semiBold"> {{ accountInformation.fullName }} </MpText>
          <MpText color="text.secondary">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </div>

      <MpPopoverList>
        <MpPopoverListItem
          >Account settings
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem
          >Company info

          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('companyList')">
          Company list
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('changeLanguage')">
          Change language
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
        <MpText :class="footerClass.font">Privacy</MpText>
        <MpText :class="footerClass.font">Terms of Use</MpText>
        <MpText :class="footerClass.font"> About Mekari Account </MpText>
        <MpText :class="footerClass.font">Mekari © 2022</MpText>
      </div>
    </template>

    <template v-if="showToggleContent === 'companyList'">
      <div :class="popoverHeaderStyle">
        <MpButton
          @click="onToggleContent('parent')"
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
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
            <MpText color="text.secondary"> Company id : 377750 </MpText>
          </div>

          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem>
          <div>
            <MpText> Company 2 </MpText>
            <MpText color="text.secondary"> Company id : 377751 </MpText>
          </div>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <div>
            <MpText> Company name 3 </MpText>
            <MpText color="text.secondary"> Company id : 377752 </MpText>
          </div>
        </MpPopoverListItem>
      </MpPopoverList>
      <ButtonPopover>+ Create new company</ButtonPopover>
    </template>

    <template v-if="showToggleContent === 'changeLanguage'">
      <div :class="popoverHeaderStyle">
        <MpButton
          @click="onToggleContent('parent')"
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
        />
        <MpText weight="semiBold"> Change language </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          <MpText weight="semiBold">English</MpText>

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
          @click="onToggleContent('parent')"
          aria-label="edit button"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
        />
        <MpText weight="semiBold"> Switch account </MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          <MpText weight="semiBold"> dimas.raka@mekari.com </MpText>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> sastra.nababan@mekari.com </MpText>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> dirga.prakhesa@mekari.com </MpText>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <MpText> ahmad.zakiy@mekari.com </MpText>
          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>
      </MpPopoverList>
      <ButtonPopover>+ Add new account</ButtonPopover>
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
          @click="[setTheme('auto'), onClosePopover?.()]"
        >
          <MpText> Auto (System settings) </MpText>

          <MpIcon v-if="currentTheme === 'auto'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'light'"
          @click="[setTheme('light'), onClosePopover?.()]"
        >
          <MpText> Light </MpText>

          <MpIcon v-if="currentTheme === 'light'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'dark'"
          @click="[setTheme('dark'), onClosePopover?.()]"
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

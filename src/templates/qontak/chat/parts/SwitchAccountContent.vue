<script setup lang="ts">
import { ref } from "vue";
import {
  css,
  MpAvatar,
  MpText,
  MpPopoverList,
  MpPopoverListItem,
  MpDivider,
  MpIcon,
  MpButton,
} from "@mekari/pixel3";
import { sva } from "@mekari/pixel3-styled-system/css";
import { usePixelLayout } from "@/components/layouts/composables/usePixelLayout";
import { ButtonPopover } from "@/components/layouts/parts";

const { accountInformation } = usePixelLayout();

const profileStyle = sva({
  slots: ["root", "content", "avatar"],
  base: {
    root: {
      backgroundColor: "background",
      borderBottomWidth: "1px",
      borderColor: "gray.100",
      borderTopRadius: "md",
      py: 4,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    avatar: {
      marginBottom: "2",
    },
  },
});
const footerStyle = sva({
  slots: ["root", "font"],
  base: {
    root: {
      display: "flex",
      gap: "3",
      flexWrap: "wrap",
      px: "3",
      py: "4",
    },
    font: {
      fontSize: "xs",
      color: "gray.600",
    },
  },
});
const popoverHeaderStyle = css({
  display: "flex",
  gap: 2,
  alignItems: "center",
  py: 2,
  px: 3,
  roundedTop: "md",
  backgroundColor: "gray.50",
  borderBottomWidth: "1px",
  borderColor: "gray.100",
});
const profileClass = profileStyle();
const footerClass = footerStyle();

type ContentType =
  | "parent"
  | "companyList"
  | "changeLanguage"
  | "switchAccount";
const showToggleContent = ref<ContentType>("parent");

function onToggleContent(content: ContentType) {
  showToggleContent.value = content;
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
          <MpText color="gray.600">
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
        <MpPopoverListItem @click="onToggleContent('changeLanguage')">
          Change language
          <MpText color="gray.600">English</MpText>
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchAccount')">
          Switch account
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
        <MpPopoverListItem
          >See the company list

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
            <MpText> Company 2 </MpText>
            <MpText color="gray.600"> Company id : 377751 </MpText>
          </div>
        </MpPopoverListItem>

        <MpPopoverListItem>
          <div>
            <MpText> Company name 3 </MpText>
            <MpText color="gray.600"> Company id : 377752 </MpText>
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
      </MpPopoverList>
      <ButtonPopover>+ Add new account</ButtonPopover>
    </template>
  </div>
</template>

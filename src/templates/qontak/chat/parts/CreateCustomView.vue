<script setup lang="ts">
import { ref, watch } from "vue";
import {
  css,
  MpFlex,
  MpButton,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverListItem,
  MpButtonGroup,
  MpDrawer,
  MpDrawerBody,
  MpDrawerCloseButton,
  MpDrawerContent,
  MpDrawerFooter,
  MpDrawerHeader,
  MpDrawerOverlay,
  MpFormControl,
  MpFormLabel,
  MpFormHelpText,
  MpFormErrorMessage,
  MpInput,
} from "@mekari/pixel3";

import EmojiPicker from "./EmojiPicker.vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'open'])

const viewName = ref("Need escalation");
const isDrawerOpen = ref(props.isOpen);

watch(
  () => props.isOpen,
  (newValue) => {
    isDrawerOpen.value = newValue;
  }
);

function onOpenDrawer() {
  emit('open') 
}

function onCloseDrawer() {
  if (isDrawerOpen.value) {
    isDrawerOpen.value = false;
    emit('close')
  }
}
</script>

<template>
  <MpDrawer
    :is-open="isDrawerOpen"
    @open="onOpenDrawer"
    @close="onCloseDrawer"
    :is-keep-alive="false"
    placement="right"
  >
    <MpDrawerContent>
      <MpDrawerHeader>
        Create custom view

        <MpDrawerCloseButton />
      </MpDrawerHeader>
      <MpDrawerBody>
        <MpFlex direction="column" gap="3">
          <MpFormControl id="view-name-input" :class="css({ width: 'full' })">
            <MpFormLabel>View Name</MpFormLabel>
            <MpFlex gap="1">
              <EmojiPicker />
              <MpInput
                v-model="viewName"
                placeholder="view name"
                :is-full-width="true"
              />
            </MpFlex>
            <MpFormErrorMessage
              >You must fill in view name and emoji</MpFormErrorMessage
            >
            <MpFormHelpText>The view name field is required</MpFormHelpText>
          </MpFormControl>
          <MpFormControl>
            <MpFormLabel>Filters</MpFormLabel>
            <MpPopover id="popover-add-filter">
              <MpPopoverTrigger>
                <MpButton variant="secondary" left-icon="add-circular"
                  >Add filter</MpButton
                >
              </MpPopoverTrigger>
              <MpPopoverContent
                :class="
                  css({
                    width: '200px',
                    maxWidth: '200px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                  })
                "
              >
                <MpPopoverListItem
                  v-for="index in 20"
                  :key="index"
                  :is-arrow="index === 10"
                >
                  Option {{ index }}
                </MpPopoverListItem>
              </MpPopoverContent>
            </MpPopover>
          </MpFormControl>
        </MpFlex>
      </MpDrawerBody>
      <MpDrawerFooter>
        <MpButtonGroup>
          <MpButton variant="secondary" @click="onCloseDrawer">
            Cancel
          </MpButton>
          <MpButton> Save </MpButton>
        </MpButtonGroup>
      </MpDrawerFooter>
    </MpDrawerContent>
    <MpDrawerOverlay />
  </MpDrawer>
</template>

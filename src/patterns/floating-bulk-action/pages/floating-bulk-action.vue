<!--
  @description
  Floating action bar at bottom-center for bulk operations on selected items; configurable drag handle, bottom offset, and advanced layout.
-->
<template>
  <MpFlex direction="column">
    <MpFlex
      alignItems="center"
      height="56px"
      px="4"
      borderBottomWidth="1px"
      borderColor="border.default"
    >
      <MpText size="h2">Header</MpText>
    </MpFlex>
    <MpFlex height="calc(100vh - 56px)">
      <MpFlex
        flex="none"
        p="4"
        width="264px"
        bg="background.surface"
        borderRightWidth="1px"
        borderColor="border.default"
      >
        <MpText size="h2">Sidebar</MpText>
      </MpFlex>
      <MpFlex width="full">
        <MpFlex
          direction="column"
          gap="4"
          height="fit-content"
          width="300px"
          p="4"
          m="4"
          shadow="lg"
          borderWidth="1px"
          borderColor="border.bold"
          rounded="md"
        >
          <MpText size="h2">Floating Bulk Action Config</MpText>
          <MpToggle v-model:is-checked="isShow"> Show drag handle </MpToggle>
          <MpToggle v-model:is-checked="isDisableDrag"> Disable drag handle </MpToggle>
          <MpFormControl>
            <MpFormLabel> Bottom offset </MpFormLabel>
            <MpInputGroup :class="css({ width: '150px' })">
              <MpInput v-model="bottomOffest" type="number" />
              <MpInputRightAddon has-background>
                <MpText weight="semiBold">px</MpText>
              </MpInputRightAddon>
            </MpInputGroup>
          </MpFormControl>
          <MpDivider />
          <MpToggle v-model:is-checked="isAdvanced"> Advanced mode </MpToggle>
          <MpFlex direction="column" gap="2">
            <MpCheckbox
              :is-indeterminate="isIndeterminate"
              :is-checked="checkedNames.length === 3"
              @change="handleCheckAll"
              @click="showAdvanced"
            >
              Check All
            </MpCheckbox>
            <MpCheckbox value="check_one" v-model="checkedNames" @click="showAdvanced">
              Data One
            </MpCheckbox>
            <MpCheckbox value="check_two" v-model="checkedNames" @click="showAdvanced">
              Data Two
            </MpCheckbox>
            <MpCheckbox value="check_three" v-model="checkedNames" @click="showAdvanced">
              Data Three
            </MpCheckbox>
          </MpFlex>
        </MpFlex>
        <!-- Simple Usage -->
        <FloatingBulkAction
          v-if="isShow && !isAdvanced"
          :is-disable-drag="isDisableDrag"
          :bottom-offest="bottomOffest"
          @close="isShow = false"
        />

        <!-- Advanced Usage -->
        <FloatingBulkAction
          v-if="isShow && isAdvanced"
          :is-disable-drag="isDisableDrag"
          :bottom-offest="bottomOffest"
          @close="isShow = false"
        >
          <template #content>
            <MpFlex gap="4">
              <MpText weight="semiBold">{{ `${checkedNames.length} data selected` }}</MpText>
              <MpTextlink
                v-if="checkedNames.length < 3"
                @click="checkedNames = ['check_one', 'check_two', 'check_three']"
              >
                Select all data
              </MpTextlink>
              <MpTextlink
                v-if="checkedNames.length === 3"
                @click="checkedNames = []"
                variant="secondary"
              >
                Clear all selection
              </MpTextlink>
            </MpFlex>
          </template>
          <template #actions>
            <MpPopover is-close-on-select>
              <MpPopoverTrigger>
                <MpButton right-icon="chevrons-down">Actions</MpButton>
              </MpPopoverTrigger>

              <MpPopoverContent>
                <MpPopoverList>
                  <MpPopoverListItem> Bulk change selection </MpPopoverListItem>
                  <MpPopoverListItem> Download selection </MpPopoverListItem>
                  <MpPopoverListItem>
                    <MpText color="text.danger">Delete all</MpText>
                  </MpPopoverListItem>
                </MpPopoverList>
              </MpPopoverContent>
            </MpPopover>
          </template>
        </FloatingBulkAction>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  css,
  MpFlex,
  MpText,
  MpButton,
  MpTextlink,
  MpFormControl,
  MpFormLabel,
  MpToggle,
  MpCheckbox,
  MpInput,
  MpInputGroup,
  MpInputRightAddon,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  MpDivider
} from '@mekari/pixel3'
import FloatingBulkAction from '../components/FloatingBulkAction.vue'

const isShow = ref(false)
const isDisableDrag = ref(false)
const isAdvanced = ref(false)
const bottomOffest = ref(40)
let checkedNames = ref([] as string[])

const isIndeterminate = computed(
  () => checkedNames.value?.length > 0 && checkedNames.value?.length < 3
)

function showAdvanced(): void {
  isShow.value = true
  isAdvanced.value = true
}

function handleCheckAll(val: boolean): void {
  if (val) {
    checkedNames.value = ['check_one', 'check_two', 'check_three']
  } else {
    checkedNames.value = []
  }
}
</script>

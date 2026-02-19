<script setup lang="ts">
import { computed } from 'vue'
import {
  css,
  MpButton,
  MpFlex,
  MpText,
  MpIcon,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
} from '@mekari/pixel3'

interface Props {
  totalItems: number
  rowsPerPageOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  rowsPerPageOptions: () => [10, 25, 50, 100],
})

const rowsPerPage = defineModel<number>('rowsPerPage', { required: true })
const currentPage = defineModel<number>('currentPage', { required: true })

const totalPages = computed(() => Math.ceil(props.totalItems / rowsPerPage.value))
const showingStart = computed(() => (currentPage.value - 1) * rowsPerPage.value + 1)
const showingEnd = computed(() => Math.min(currentPage.value * rowsPerPage.value, props.totalItems))

function handleRowsPerPageChange(opt: number) {
  rowsPerPage.value = opt
  currentPage.value = 1
}

function goToPrevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<template>
  <MpFlex justify="space-between" align="center" :class="css({ py: '3', px: '2' })">
    <MpFlex align="center" gap="2">
      <MpText :class="css({ color: 'gray.600' })">Rows per page</MpText>
      <MpPopover>
        <MpPopoverTrigger>
          <MpButton variant="ghost" size="sm">
            {{ rowsPerPage }}
            <MpIcon name="chevrons-down" size="sm" :class="css({ ml: '1' })" />
          </MpButton>
        </MpPopoverTrigger>
        <MpPopoverContent>
          <MpPopoverList>
            <MpPopoverListItem
              v-for="opt in rowsPerPageOptions"
              :key="opt"
              :is-active="rowsPerPage === opt"
              @click="handleRowsPerPageChange(opt)"
            >
              {{ opt }}
            </MpPopoverListItem>
          </MpPopoverList>
        </MpPopoverContent>
      </MpPopover>
      <MpText :class="css({ color: 'gray.600' })">
        Showing {{ showingStart }}-{{ showingEnd }} of {{ totalItems }}
      </MpText>
    </MpFlex>

    <MpFlex align="center" gap="2">
      <MpText :class="css({ color: 'gray.600' })">{{ currentPage }}</MpText>
      <MpText :class="css({ color: 'gray.600' })">of {{ totalPages }} page</MpText>
      <MpButton
        variant="ghost"
        left-icon="chevrons-left"
        size="sm"
        :is-disabled="currentPage === 1"
        @click="goToPrevPage"
      />
      <MpButton
        variant="ghost"
        left-icon="chevrons-right"
        size="sm"
        :is-disabled="currentPage >= totalPages"
        @click="goToNextPage"
      />
    </MpFlex>
  </MpFlex>
</template>

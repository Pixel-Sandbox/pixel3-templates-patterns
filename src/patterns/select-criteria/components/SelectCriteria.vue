<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  MpButton,
  MpCheckbox,
  MpDivider,
  MpIcon,
  MpInput,
  MpInputGroup,
  MpInputLeftAddon,
  MpInputRightAddon,
  MpPopover,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  MpPopoverTrigger,
  MpSpinner,
  MpText,
  Pixel,
  css,
} from '@mekari/pixel3'
import { onClickOutside } from '@mekari/pixel3-utils'

export interface SelectCriteriaGroupOptions {
  id: string
  name: string
}

export interface SelectCriteriaOptions {
  loading: boolean
  options: { value: string, label: string }[]
  selectedOptions: Set<string>
  popoverOpen: boolean
  searchQuery: string
  renderKey: number
}

const props = defineProps({
  groupOptions: {
    type: Array as () => SelectCriteriaGroupOptions[],
    required: true,
  },
  setOptions: {
    type: Function as unknown as () => (id: string) => Promise<{ value: string, label: string }[]>,
    required: true,
  },
})

const emit = defineEmits(['update:selected'])

const popoverRefs = ref<Map<string, HTMLElement>>(new Map())
const criteriaItems = ref<SelectCriteriaGroupOptions[]>([...props.groupOptions])
const criteriaSelectedItems = ref<SelectCriteriaGroupOptions[]>([])
const criteriaData = reactive<Record<string, SelectCriteriaOptions>>({})
const collapseThreshold = 6
const collapsedStates = reactive<Record<string, boolean>>({})

function setPopoverRef(id: string, el: HTMLElement | null) {
  if (el) {
    popoverRefs.value.set(id, el)
    setupClickOutside(id, el)
  }
}

function setupClickOutside(id: string, el: HTMLElement) {
  onClickOutside(el, () => {
    if (criteriaData[id]?.popoverOpen) {
      onClosePopover(id)
    }
  })
}

function onOpenPopover(itemId: string) {
  Object.keys(criteriaData).forEach((id) => {
    if (id !== itemId) {
      criteriaData[id].popoverOpen = false
    }
  })
  criteriaData[itemId].renderKey = (criteriaData[itemId].renderKey || 0) + 1
  criteriaData[itemId].popoverOpen = true
}

function onClosePopover(itemId: string) {
  if (criteriaData[itemId]) {
    criteriaData[itemId].popoverOpen = false
  }
}

function onSelectCriteria(item: SelectCriteriaGroupOptions) {
  criteriaSelectedItems.value.push(item)
  criteriaItems.value = criteriaItems.value.filter(criteria => criteria.id !== item.id)
  collapsedStates[item.id] = true
  criteriaData[item.id] = {
    loading: true,
    options: [],
    selectedOptions: new Set(),
    popoverOpen: false,
    searchQuery: '',
    renderKey: 0,
  }

  props.setOptions(item.id).then((options) => {
    criteriaData[item.id].options = options
    criteriaData[item.id].loading = false
  })

  emit('update:selected', getUpdatedSelectedItems())
}

function onDeselectCriteria(item: SelectCriteriaGroupOptions) {
  criteriaSelectedItems.value = criteriaSelectedItems.value.filter(selected => selected.id !== item.id)
  criteriaItems.value = [...criteriaItems.value, item].sort((a, b) => {
    const originalOrderItems = props.groupOptions.findIndex(opt => opt.id === a.id) - props.groupOptions.findIndex(opt => opt.id === b.id)
    return originalOrderItems
  })
  delete criteriaData[item.id]
  popoverRefs.value.delete(item.id)

  emit('update:selected', getUpdatedSelectedItems())
}

function onSelectOption(criteriaId: string, value: string) {
  const selectedOptions = criteriaData[criteriaId].selectedOptions
  if (selectedOptions.has(value)) {
    selectedOptions.delete(value)
  }
  else {
    selectedOptions.add(value)
  }

  emit('update:selected', getUpdatedSelectedItems())
}

function isAllSelected(criteriaId: string): boolean {
  const selectedOptions = criteriaData[criteriaId]?.selectedOptions || new Set()
  const allOptions = criteriaData[criteriaId]?.options || []

  return allOptions.every(option => selectedOptions.has(option.value))
}

function isIndeterminate(criteriaId: string): boolean {
  const selectedOptions = criteriaData[criteriaId]?.selectedOptions || new Set()
  const allOptions = criteriaData[criteriaId]?.options || []

  const selectedAllOptions = allOptions.filter(option => selectedOptions.has(option.value))
  return selectedAllOptions.length > 0 && selectedAllOptions.length < allOptions.length
}

function onSelectAll(criteriaId: string): void {
  const selectedOptions = criteriaData[criteriaId]?.selectedOptions || new Set()
  const allOptions = criteriaData[criteriaId]?.options || []

  if (isAllSelected(criteriaId)) {
    allOptions.forEach(option => selectedOptions.delete(option.value))
  }
  else {
    allOptions.forEach(option => selectedOptions.add(option.value))
  }

  emit('update:selected', getUpdatedSelectedItems())
}

function toggleCollapse(criteriaId: string) {
  collapsedStates[criteriaId] = !collapsedStates[criteriaId]
}

function isCollapsed(criteriaId: string): boolean {
  return collapsedStates[criteriaId] ?? true
}

function getSelectedOptionTextList(criteriaId: string): string[] {
  const selectedOptions = Array.from(criteriaData[criteriaId]?.selectedOptions || [])
  const labels = selectedOptions
    .map(value => criteriaData[criteriaId]?.options.find(option => option.value === value)?.label || '')
  if (isCollapsed(criteriaId) && labels.length > collapseThreshold) {
    if (labels.length > 6) {
      return labels.slice(0, 5)
    }
    else {
      return labels.slice(0, collapseThreshold)
    }
  }

  return labels
}

function getUpdatedSelectedItems() {
  return criteriaSelectedItems.value.map(item => ({
    id: item.id,
    name: item.name,
    selectedOptions: Array.from(criteriaData[item.id]?.selectedOptions || []),
  }))
}

function onSearchChange(criteriaId: string, value: string) {
  criteriaData[criteriaId].searchQuery = value || ''
}

function getFilteredOptions(criteriaId: string) {
  const { options, searchQuery } = criteriaData[criteriaId]
  if (!searchQuery)
    return options

  return options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )
}
</script>

<template>
  <Pixel.div>
    <Pixel.div :class="css({ maxWidth: '522px', marginBottom: '16px' })">
      <Pixel.div v-for="(item, parentIndex) in criteriaSelectedItems" :key="item.id">
        <Pixel.div
          :class="css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          })"
        >
          <MpText as="h3" size="h3">
            {{ item.name }}
          </MpText>
          <MpButton
            v-tooltip="'Remove'"
            leftIcon="minus-circular"
            variant="ghost"
            size="sm"
            @click="onDeselectCriteria(item)"
          />
        </Pixel.div>

        <MpText v-if="criteriaData[item.id]?.selectedOptions.size" :class="css({ marginBottom: '12px' })">
          is any of
          <span v-for="(label, index) in getSelectedOptionTextList(item.id)" :key="index">
            {{ label }}<span v-if="index < getSelectedOptionTextList(item.id).length - 1">, </span>
          </span>
          <span v-if="criteriaData[item.id]?.selectedOptions.size > collapseThreshold">
            {{ isCollapsed(item.id) ? ', or' : '' }}
            <MpButton variant="textLink" @click="toggleCollapse(item.id)">
              {{ isCollapsed(item.id) ? `${(criteriaData[item.id]?.selectedOptions.size - 5)} others` : 'Show less' }}
            </MpButton>
          </span>
        </MpText>

        <Pixel.div :ref="el => setPopoverRef(item.id, el)" :class="css({ display: 'inline' })">
          <MpPopover isManual :isOpen="criteriaData[item.id]?.popoverOpen">
            <MpPopoverTrigger>
              <MpInputGroup :class="css({ width: '264px', marginBottom: '4px' })" size="md">
                <MpInput
                  :class="css({ cursor: 'pointer' })"
                  isReadOnly
                  :value="criteriaData[item.id]?.selectedOptions.size === 0
                    ? `Select ${item.name.toLowerCase()}`
                    : `Selected (${criteriaData[item.id]?.selectedOptions.size})`"
                  @click="onOpenPopover(item.id)"
                />
                <MpInputRightAddon>
                  <MpIcon name="chevrons-down" size="sm" />
                </MpInputRightAddon>
              </MpInputGroup>
            </MpPopoverTrigger>

            <MpPopoverContent
              :key="criteriaData[item.id]?.renderKey"
              :class="css({
                minWidth: '264px',
                maxWidth: '264px',
                maxHeight: '256px',
                overflowY: 'auto',
              })"
            >
              <Pixel.div v-if="criteriaData[item.id]?.loading" :class="css({ display: 'flex', gap: '8px', padding: '16px' })">
                <MpSpinner /> Loading
              </Pixel.div>
              <div v-else>
                <MpPopoverList>
                  <Pixel.div :class="css({ marginX: '12px', marginBottom: '8px' })">
                    <MpInputGroup size="md">
                      <MpInputLeftAddon>
                        <MpIcon name="search" size="sm" />
                      </MpInputLeftAddon>
                      <MpInput
                        isClearable
                        :modelValue="criteriaData[item.id].searchQuery"
                        placeholder="Search..."
                        @update:model-value="(value: string) => onSearchChange(item.id, value)"
                      />
                    </MpInputGroup>
                  </Pixel.div>

                  <MpPopoverListItem v-if="getFilteredOptions(item.id).length > 0">
                    <MpCheckbox
                      :id="`select-all-${item.id}`"
                      :isChecked="isAllSelected(item.id)"
                      :isIndeterminate="isIndeterminate(item.id)"
                      @update:is-checked="onSelectAll(item.id)"
                    >
                      Select all
                    </MpCheckbox>
                  </MpPopoverListItem>

                  <MpPopoverListItem
                    v-for="option in getFilteredOptions(item.id)"
                    :key="option.value"
                  >
                    <MpCheckbox
                      :id="option.value"
                      :value="option.value"
                      :isChecked="criteriaData[item.id].selectedOptions.has(option.value)"
                      @update:is-checked="onSelectOption(item.id, option.value)"
                    >
                      {{ option.label }}
                    </MpCheckbox>
                  </MpPopoverListItem>

                  <MpText
                    v-if="getFilteredOptions(item.id).length === 0"
                    :class="css({ textAlign: 'left', width: '100%', paddingY: '8px', paddingX: '12px' })"
                  >
                    No results found
                  </MpText>
                </MpPopoverList>
              </div>
            </MpPopoverContent>
          </MpPopover>
        </Pixel.div>
        <MpDivider
          v-if="parentIndex !== criteriaSelectedItems.length - 1"
          :class="css({ marginY: '16px' })"
        />
      </Pixel.div>
    </Pixel.div>

    <MpPopover isCloseOnSelect>
      <MpPopoverTrigger>
        <MpButton variant="secondary" leftIcon="add" :isDisabled="criteriaItems.length === 0">
          Add criteria
        </MpButton>
      </MpPopoverTrigger>
      <MpPopoverContent
        :class="css({
          minWidth: '160px',
          maxWidth: '160px',
          maxHeight: '300px',
          overflowY: 'auto',
        })"
      >
        <MpPopoverList>
          <MpPopoverListItem v-for="item in criteriaItems" :key="item.id" @click="onSelectCriteria(item)">
            {{ item.name }}
          </MpPopoverListItem>
        </MpPopoverList>
      </MpPopoverContent>
    </MpPopover>
  </Pixel.div>
</template>

<style>
[data-pixel-component="MpCheckbox"] {
  width: 100%
}
</style>

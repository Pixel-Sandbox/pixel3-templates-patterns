<script setup lang="ts">
  import {
    MpFormControl,
    MpFormLabel,
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
    MpText,
    css
  } from '@mekari/pixel3'
  import { nextTick, ref } from 'vue'
  import { useVirtualList } from '@mekari/pixel3-utils'

  interface Regions {
    name: string
    flag: string
    code: string
    dial_code: string
    height: number
    id: number
  }
  const regions = ref<Regions[]>([])

  function getAllRegions() {
    fetch(
      'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json'
    )
      .then((res) => res.json())
      .then(
        (data) =>
          (regions.value = data.map((v: Regions, i: number) => {
            return {
              ...v,
              id: i,
              height: 37
            }
          }))
      )
  }
  getAllRegions()

  const { list, containerProps, wrapperProps } = useVirtualList(regions, {
    itemHeight: (i) => regions.value[i].height,
    overscan: 10
  })

  function onOpenPopover() {
    nextTick(() => {
      const inputEl = document.getElementById('phoneNumber-control')

      inputEl?.focus()
    })
  }
</script>

<template>
  <div
    :class="
      css({
        p: 4,
        display: 'grid',
        gridTemplateColumns: '3',
        gap: 8
      })
    "
  >
    <MpFormControl>
      <MpFormLabel> Additional period </MpFormLabel>

      <MpInputGroup size="md">
        <MpInputLeftAddon
          has-background
          :class="
            css({
              cursor: 'pointer'
            })
          "
        >
          <MpPopover isAdaptiveWidth>
            <MpPopoverTrigger>
              <div
                style="padding: 0 12px"
                :class="
                  css({
                    display: 'flex'
                  })
                "
              >
                <MpText weight="semiBold"> Months </MpText>
                <MpIcon
                  name="chevrons-down"
                  :class="
                    css({
                      ml: 2
                    })
                  "
                />
              </div>
            </MpPopoverTrigger>

            <MpPopoverContent>
              <MpPopoverList>
                <MpPopoverListItem isActive> Months </MpPopoverListItem>
                <MpPopoverListItem> Years </MpPopoverListItem>
              </MpPopoverList>
            </MpPopoverContent>
          </MpPopover>
        </MpInputLeftAddon>
        <MpInput is-clearable />
      </MpInputGroup>
    </MpFormControl>

    <MpFormControl>
      <MpFormLabel> Additional period </MpFormLabel>

      <MpInputGroup size="md">
        <MpInput is-clearable />
        <MpInputRightAddon
          has-background
          :class="
            css({
              cursor: 'pointer'
            })
          "
        >
          <MpPopover isAdaptiveWidth>
            <MpPopoverTrigger>
              <div
                style="padding: 0 12px"
                :class="
                  css({
                    display: 'flex'
                  })
                "
              >
                <MpText weight="semiBold"> Months </MpText>
                <MpIcon
                  name="chevrons-down"
                  :class="
                    css({
                      ml: 2
                    })
                  "
                />
              </div>
            </MpPopoverTrigger>

            <MpPopoverContent>
              <MpPopoverList>
                <MpPopoverListItem isActive> Months </MpPopoverListItem>
                <MpPopoverListItem> Years </MpPopoverListItem>
              </MpPopoverList>
            </MpPopoverContent>
          </MpPopover>
        </MpInputRightAddon>
      </MpInputGroup>
    </MpFormControl>

    <MpFormControl>
      <MpFormLabel> Additional period </MpFormLabel>

      <MpInputGroup size="md">
        <MpInputLeftAddon
          has-background
          :class="
            css({
              cursor: 'pointer'
            })
          "
        >
          <MpPopover :isKeepAlive="false" @open="onOpenPopover">
            <MpPopoverTrigger>
              <div
                style="padding: 0 12px"
                :class="
                  css({
                    display: 'flex',
                    alignItems: 'center'
                  })
                "
              >
                <MpText weight="semiBold"> 🇮🇩 </MpText>
                <MpIcon
                  name="chevrons-down"
                  :class="
                    css({
                      ml: 2
                    })
                  "
                />
              </div>
            </MpPopoverTrigger>

            <MpPopoverContent
              :class="
                css({
                  width: '420px',
                  overflowY: 'hidden',
                  marginTop: 1
                })
              "
            >
              <div v-bind="containerProps" style="height: 300px">
                <div v-bind="wrapperProps">
                  <div :class="css({ px: 3, pt: 4 })">
                    <MpInput id="phoneNumber" placeholder="Search...." />
                  </div>

                  <MpPopoverList>
                    <MpPopoverListItem
                      v-for="region in list"
                      :key="region.index"
                      :style="{
                        height: `${region.data.height}px`
                      }"
                    >
                      <MpText>
                        <span style="margin-right: 4px">{{ region.data.flag }}</span>
                        {{ region.data.name }}
                      </MpText>

                      <MpText color="gray.600">
                        {{ region.data.dial_code }}
                      </MpText>
                    </MpPopoverListItem>
                  </MpPopoverList>
                </div>
              </div>
            </MpPopoverContent>
          </MpPopover>
        </MpInputLeftAddon>
        <MpInput is-clearable placeholder="+62" />
      </MpInputGroup>
    </MpFormControl>
  </div>
</template>

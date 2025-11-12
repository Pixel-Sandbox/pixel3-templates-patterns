<script setup lang="ts">
import { computed, ref } from 'vue'
import { MpAvatar, MpButton, MpDivider, MpIcon, MpInput, MpInputGroup, MpInputLeftAddon, MpPopover, MpPopoverContent, MpPopoverList, MpPopoverListItem, MpPopoverTrigger, MpText, css } from '@mekari/pixel3'

const activeStack = ref('parent')
const companyQuery = ref('')
const companyItems = ref([
  { name: 'PT Mid Solusi Nusantara', isActive: true },
  { name: 'PT Talenta Digital Indonesia', isActive: false },
  { name: 'SP-holding', isActive: false },
  { name: 'CV Kreatif Abadi', isActive: false },
  { name: 'PT Solusi Teknologi Cerdas', isActive: false },
  { name: 'PT Nusantara Inovasi', isActive: false },
  { name: 'SP Digital Media', isActive: false },
  { name: 'PT Global Sinergi', isActive: false },
  { name: 'CV Mandiri Sejahtera', isActive: false },
  { name: 'PT Sukses Bersama', isActive: false },
  { name: 'PT Talenta Prima', isActive: false },
])
const filteredCompanyItems = computed(() => {
  const query = (companyQuery.value || '').toLowerCase().trim()
  if (!query) {
    return companyItems.value
  }
  return companyItems.value.filter(item =>
    (item.name || '').toLowerCase().includes(query),
  )
})
</script>

<template>
  <div :class="css({ paddingX: '2', paddingY: '4' })">
    <MpPopover :isKeepAlive="false" @close="() => activeStack = 'parent'">
      <MpPopoverTrigger>
        <MpButton variant="ghost" size="sm">
          <MpAvatar name="Rizal Chandra" src="https://randomuser.me/api/portraits/women/11.jpg" />
          <div :class="css({ textAlign: 'left' })">
            <MpText weight="semiBold">
              Rizal Chandra
            </MpText>
            <MpText size="label-small" color="gray.600">
              PT Mid Solusi Nusantara
            </MpText>
          </div>
        </MpButton>
      </MpPopoverTrigger>
      <MpPopoverContent :class="css({ width: '65', p: '0' })">
        <template v-if="activeStack === 'parent'">
          <div
            :class="
              css({
                backgroundColor: 'background.neutral.subtle',
                borderBottomWidth: '1px',
                borderColor: 'border.default',
                borderTopRadius: 'md',
                paddingY: 4,
              })
            "
          >
            <div
              :class="
                css({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                })
              "
            >
              <MpAvatar
                :class="css({ marginBottom: '2' })"
                name="Rizal Chandra"
                src="https://randomuser.me/api/portraits/women/11.jpg"
                size="lg"
              />
              <MpText weight="semiBold">
                Rizal Chandra
              </MpText>
              <MpText color="gray.600">
                PT Mid Solusi Nusantara
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
            <MpPopoverListItem is-arrow @click="activeStack = 'company-list'">
              Company list
            </MpPopoverListItem>
            <MpPopoverListItem @click="activeStack = 'change-language'">
              Change language
              <MpText color="gray.600">
                English
              </MpText>
            </MpPopoverListItem>
          </MpPopoverList>
          <MpDivider :class="css({ marginY: '0' })" />
          <MpPopoverList>
            <MpPopoverListItem is-arrow @click="activeStack = 'switch-account'">
              Switch account
            </MpPopoverListItem>
            <MpPopoverListItem>Sign out</MpPopoverListItem>
          </MpPopoverList>
          <div :class="css({ display: 'flex', gap: '3', flexWrap: 'wrap', paddingX: '3', paddingY: '4' })">
            <MpText :class="css({ fontSize: 'xs', color: 'gray.600' })">
              Privacy
            </MpText>
            <MpText :class="css({ fontSize: 'xs', color: 'gray.600' })">
              Terms of Use
            </MpText>
            <MpText :class="css({ fontSize: 'xs', color: 'gray.600' })">
              About Mekari Account
            </MpText>
            <MpText :class="css({ fontSize: 'xs', color: 'gray.600' })">
              Mekari © 2025
            </MpText>
          </div>
        </template>

        <template v-if="activeStack === 'company-list'">
          <div :class="css({ display: 'flex', gap: '2', alignItems: 'center', paddingY: '2', paddingX: '3', roundedTop: 'md', backgroundColor: 'background.neutral.subtle', borderBottomWidth: '1px', borderColor: 'border.default' })">
            <MpButton
              aria-label="edit button"
              left-icon="arrows-left"
              variant="ghost"
              size="sm"
              @click="activeStack = 'parent'"
            />
            <MpText weight="semiBold">
              Company list
            </MpText>
          </div>
          <div v-if="companyItems.length > 6" :class="css({ paddingTop: '3', paddingX: '3' })">
            <MpInputGroup size="md">
              <MpInputLeftAddon>
                <MpIcon name="search" size="sm" />
              </MpInputLeftAddon>
              <MpInput v-model="companyQuery" placeholder="Search..." is-clearable />
            </MpInputGroup>
          </div>
          <MpPopoverList>
            <MpText v-if="filteredCompanyItems.length === 0" :class="css({ color: 'gray.600', paddingBottom: '2' })">
              No data found
            </MpText>
            <MpPopoverListItem v-for="item in filteredCompanyItems" :key="item.name">
              <MpText>
                {{ item.name }}
              </MpText>
              <MpIcon v-if="item.isActive" name="check" size="sm" />
            </MpPopoverListItem>
          </MpPopoverList>
        </template>

        <template v-if="activeStack === 'change-language'">
          <div :class="css({ display: 'flex', gap: '2', alignItems: 'center', paddingY: '2', paddingX: '3', roundedTop: 'md', backgroundColor: 'background.neutral.subtle', borderBottomWidth: '1px', borderColor: 'border.default' })">
            <MpButton
              aria-label="edit button"
              left-icon="arrows-left"
              variant="ghost"
              size="sm"
              @click="activeStack = 'parent'"
            />
            <MpText weight="semiBold">
              Change language
            </MpText>
          </div>
          <MpPopoverList>
            <MpPopoverListItem>
              <MpText weight="semiBold">
                English
              </MpText>
              <MpIcon name="check" size="sm" />
            </MpPopoverListItem>
            <MpPopoverListItem>
              <MpText>Indonesia</MpText>
            </MpPopoverListItem>
          </MpPopoverList>
        </template>

        <template v-if="activeStack === 'switch-account'">
          <div :class="css({ display: 'flex', gap: '2', alignItems: 'center', paddingY: '2', paddingX: '3', roundedTop: 'md', backgroundColor: 'background.neutral.subtle', borderBottomWidth: '1px', borderColor: 'border.default' })">
            <MpButton
              aria-label="edit button"
              left-icon="arrows-left"
              variant="ghost"
              size="sm"
              @click="activeStack = 'parent'"
            />
            <MpText weight="semiBold">
              Switch account
            </MpText>
          </div>
          <MpPopoverList>
            <MpPopoverListItem>
              <MpText weight="semiBold">
                rizal.chandra@msn.com
              </MpText>
              <MpIcon name="check" size="sm" />
            </MpPopoverListItem>
            <MpPopoverListItem>
              <MpText>
                rizal.chandra@gmail.com
              </MpText>
            </MpPopoverListItem>
          </MpPopoverList>
        </template>
      </MpPopoverContent>
    </MpPopover>
  </div>
</template>

<script setup lang="tsx">
  import {
    css,
    MpIcon,
    MpDrawer,
    MpDrawerContent,
    MpDrawerBody,
    MpDrawerOverlay,
    MpFlex,
    MpAvatar,
    MpText,
    MpDivider,
    Pixel,
    MpAccordion,
    MpAccordionHeader,
    MpAccordionItem,
    MpAccordionIcon,
    MpAccordionPanel
  } from '@mekari/pixel3'
  import { Box } from '@mekari/pixel3-styled-system/jsx'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import type { MenuItem } from '../types'

  import { usePixelLayout } from '../composables/usePixelLayout.ts'

  const router = useRouter()
  const { menuItems } = usePixelLayout()

  const buttonStyle = css({
    cursor: 'pointer',
    height: '9.5',
    minWidth: '9.5',
    padding: '1.5',
    rounded: 'sm',
    transition: 'all 250ms ease 0s',
    _focus: {
      boxShadow: 'outer',
      outline: 'none'
    },
    _hover: {
      background: 'gray.25'
    }
  })

  const isOpen = ref(false)
  const isToggled = ref(false)

  const handleOpenDrawer = (value: boolean) => {
    isOpen.value = value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSelectMenu(menu: MenuItem) {
    if (menu.as === 'RouterLink') {
      menu.link && router.push(menu.link)
      return
    }

    if (menu.as === 'group') {
      isToggled.value = true
    }
  }
</script>

<template>
  <div
    :class="
      css({
        display: {
          base: 'flex',
          md: 'none'
        }
      })
    "
  >
    <button v-tooltip="'Notifikasi'" :class="buttonStyle" @click="handleOpenDrawer(!isOpen)">
      <MpIcon :name="isOpen ? 'close' : 'burger'" size="md" />
    </button>

    <MpDrawer :isOpen="isOpen" size="full" @close="isOpen = false">
      <MpDrawerContent>
        <MpDrawerBody
          tabindex="0"
          :class="
            css({
              maxHeight: 'calc(100vh)',
              overflow: 'hidden auto',
              padding: 0,
              marginTop: ['4', '20'],
              backgroundColor: 'background'
            })
          "
        >
          <MpFlex
            alignItems="center"
            borderRadius="none"
            paddingX="4"
            paddingY="2.5"
            backgroundColor="white"
          >
            <MpAvatar
              name="Rizal Chandra"
              src="https://i.pravatar.cc/300"
              size="md"
              :class="css({ marginRight: '2' })"
              :showBorder="false"
            />

            <MpFlex flexDirection="column">
              <MpText weight="semiBold"> Rizal Chandra </MpText>
              <MpText size="label-small" color="gray.600"> PT Central Perk Indonesia </MpText>
            </MpFlex>
          </MpFlex>

          <!-- Menus -->
          <Box paddingX="2" paddingY="4" backgroundColor="white">
            <Pixel.ul flexDirection="column">
              <template v-if="!isToggled">
                <template v-for="menu in menuItems" :key="menu.id">
                  <Pixel.li
                    v-if="['RouterLink', 'a', 'group'].includes(menu.as)"
                    @click="handleSelectMenu(menu as MenuItem)"
                    class="group"
                    flex="1"
                    borderRadius="sm"
                    transition="all 200ms ease"
                    px="2"
                    py="2"
                    :backgroundColor="menu.isActive ? 'ice.50' : 'inherit'"
                    :color="menu.isActive ? 'blue.400' : 'inherit'"
                    :_hover="{
                      backgroundColor: 'ice.50',
                      color: 'blue.400',
                      cursor: 'pointer'
                    }"
                  >
                    <MpFlex alignItems="center" justifyContent="space-between">
                      <MpFlex gap="2" alignItems="center">
                        <MpIcon
                          :name="menu.icon"
                          :variant="menu.isActive ? 'fill' : 'outline'"
                          :color="menu.isActive ? 'blue.400' : 'inherit'"
                        />
                        <MpText
                          :color="menu.isActive ? 'blue.400' : 'inherit'"
                          :weight="menu.isActive ? 'semiBold' : 'regular'"
                        >
                          {{ menu.name }}
                        </MpText>
                      </MpFlex>

                      <MpIcon v-if="menu.as === 'group'" name="chevrons-right" color="dark" />
                    </MpFlex>
                  </Pixel.li>

                  <MpDivider v-if="menu.as === 'divider'" />
                </template>
              </template>

              <template v-else>
                <div>
                  <MpFlex
                    alignItems="center"
                    flex="1"
                    borderRadius="sm"
                    transition="all 200ms ease"
                    px="2"
                    py="2"
                    gap="2"
                    :_hover="{
                      backgroundColor: 'ice.50',
                      color: 'blue.400',
                      cursor: 'pointer'
                    }"
                    @click="isToggled = false"
                  >
                    <MpIcon name="arrows-left" />

                    <MpText> Back </MpText>
                  </MpFlex>
                  <MpDivider />

                  <div>
                    <MpText
                      weight="semiBold"
                      color="blue.400"
                      :class="
                        css({
                          px: '4',
                          py: '2'
                        })
                      "
                    >
                      CHILD MENU
                    </MpText>

                    <div>
                      <MpFlex direction="column">
                        <Box
                          flex="1"
                          role="group"
                          borderRadius="sm"
                          px="4"
                          py="2"
                          color="dark"
                          fontWeight="regular"
                          :_hover="{
                            color: 'blue.400',
                            cursor: 'pointer'
                          }"
                        >
                          <MpText color="dark">Child menu 1</MpText>
                        </Box>
                      </MpFlex>

                      <MpFlex direction="column">
                        <Box
                          flex="1"
                          role="group"
                          borderRadius="sm"
                          px="4"
                          py="2"
                          color="dark"
                          fontWeight="regular"
                          :_hover="{
                            color: 'blue.400',
                            cursor: 'pointer'
                          }"
                        >
                          <MpText color="dark">Child menu 2</MpText>
                        </Box>
                      </MpFlex>

                      <MpAccordion isAllowToggle>
                        <MpAccordionItem>
                          <MpAccordionHeader
                            :class="
                              css({
                                justifyContent: 'space-between',
                                px: '4',
                                py: '2',
                                borderRadius: 'md',
                                _hover: {
                                  color: 'blue.400',
                                  cursor: 'pointer'
                                }
                              })
                            "
                          >
                            <div>
                              <MpFlex direction="column">
                                <Box flex="1" border-radius="sm">
                                  <MpText color="dark">Child menu 3</MpText>
                                </Box>
                              </MpFlex>
                            </div>
                            <MpAccordionIcon />
                          </MpAccordionHeader>

                          <MpAccordionPanel :class="css({ py: '0' })">
                            <div>
                              <MpFlex direction="column">
                                <Box
                                  flex="1"
                                  role="group"
                                  borderRadius="sm"
                                  paddingLeft="8"
                                  py="2"
                                  color="dark"
                                  :_hover="{
                                    color: 'dark',
                                    cursor: 'pointer'
                                  }"
                                >
                                  <MpText color="dark"> Subchild menu 1</MpText>
                                </Box>
                              </MpFlex>
                            </div>
                            <div>
                              <MpFlex direction="column">
                                <Box
                                  flex="1"
                                  role="group"
                                  borderRadius="sm"
                                  paddingLeft="8"
                                  py="2"
                                  color="dark"
                                  :_hover="{
                                    color: 'dark',
                                    cursor: 'pointer'
                                  }"
                                >
                                  <MpText color="dark"> Subchild menu 2</MpText>
                                </Box>
                              </MpFlex>
                            </div>
                          </MpAccordionPanel>
                        </MpAccordionItem>
                      </MpAccordion>
                    </div>
                  </div>
                </div>
              </template>
            </Pixel.ul>
          </Box>

          <!-- End of Menus -->

          <!-- Bottom -->
          <Box padding="4">
            <MpFlex flexDirection="column">
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Account settings
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Company info
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Company list
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Help & Support
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Change language
              </MpText>
              <MpDivider />
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Switch account
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Sign out
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpDivider />
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })"> Privacy </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                Terms of Use
              </MpText>
              <MpText as="a" href="#" color="gray.600" :class="css({ py: '2' })">
                About Mekari Account
              </MpText>
              <MpText color="gray.600" :class="css({ py: '2' })">Mekari © 2022</MpText>
            </MpFlex>
          </Box>
          <!-- End of Bottom -->
        </MpDrawerBody>
      </MpDrawerContent>

      <MpDrawerOverlay />
    </MpDrawer>
  </div>
</template>

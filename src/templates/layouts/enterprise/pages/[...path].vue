<!--
  @description
  Enterprise layout with left and right sidebars (SideMenu, SideMenuAI), toggleable; dynamic page title from route path. BaseLayout with PageShell, PageHeader, PageContent.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { css, MpFlex, MpText } from '@mekari/pixel3'
import { BaseLayout, PageShell, PageLeftSidebar, PageMain, PageRightSidebar, PageHeader, PageToggleButton, PageContent, SideMenu, SideMenuAI } from '../components/layout'
import { useAppSidebar } from '../composables/useAppSidebar'

const route = useRoute()

// Sidebar state
const { isLeftOpen, isRightOpen, left, right } = useAppSidebar()

const pageTitle = computed(() => {
  const path = route.params.path
  if (Array.isArray(path) && path.length > 0) {
    // Convert path like "sales-deliveries" to "Sales deliveries"
    return path[path.length - 1]
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return 'Page'
})
</script>

<template>
  <BaseLayout>
    <PageShell>
      <PageLeftSidebar :open="isLeftOpen">
        <SideMenu @toggle="left.toggle" />
      </PageLeftSidebar>

      <PageMain>
        <PageHeader>
          <MpFlex align="center" gap="6">
            <PageToggleButton v-if="!isLeftOpen" @click="left.toggle" />
            <MpText size="h1">{{ pageTitle }}</MpText>
          </MpFlex>
          <div />
        </PageHeader>

        <PageContent :left-sidebar-open="isLeftOpen" :right-sidebar-open="isRightOpen">
          <MpText :class="css({ color: 'gray.500' })">
            ...
          </MpText>
        </PageContent>
      </PageMain>

      <PageRightSidebar :open="isRightOpen">
        <SideMenuAI @toggle="right.toggle" />
      </PageRightSidebar>
    </PageShell>
  </BaseLayout>
</template>

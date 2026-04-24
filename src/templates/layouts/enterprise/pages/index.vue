<!--
  @description
  Enterprise layout entry; redirects to sales-invoices. Uses BaseLayout with PageShell and PageContent.
-->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BaseLayout, PageShell, PageMain, PageContent } from '../components/layout'

const router = useRouter()

// Redirect to sales-invoices by default
router.replace('/templates/layouts/enterprise/sales-invoices')
</script>

<template>
  <BaseLayout>
    <PageShell>
      <PageMain>
        <PageContent>
          <div>Content</div>
        </PageContent>
      </PageMain>
    </PageShell>
  </BaseLayout>
</template>

<route lang="yaml">
meta:
  cover: /cover/templates/layouts/enterprise.png
</route>

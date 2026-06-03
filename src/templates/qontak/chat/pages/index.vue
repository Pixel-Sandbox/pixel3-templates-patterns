<!--
  @description
  Chat template entry; redirects to inbox page.
-->
<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  router.push('/templates/qontak/chat/inbox')
</script>

<route lang="yaml">
meta:
  cover: /cover/templates/qontak/inbox-revamp.jpg
</route>

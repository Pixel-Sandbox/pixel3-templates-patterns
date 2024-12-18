<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="tsx">
import { MpBadge, MpFlex, MpInput, MpInputGroup, MpText, css } from '@mekari/pixel3'
import { routes } from 'vue-router/auto/routes'
import { computed } from 'vue'
import { group, title } from '@/utils'

const getPatternRoutes = computed(() => {
  const allChildrens: any = []
  const patterns = routes.find(v => v.path === '/patterns')?.children

  patterns?.forEach((r) => {
    const restChildrens = r.children?.map((c) => {
      return {
        path: `/patterns/${r.path}/${c.path}`,
        title: c.meta?.name || title(c.path),
        _raw: c,
      }
    }) as any

    allChildrens.push(...restChildrens)
  })

  return allChildrens
})

const getTemplateRoutes = computed(() => {
  const allChildrens: any = []
  const templates = routes.find(v => v.path === '/templates')?.children

  templates?.forEach((r) => {
    const restChildrens = r.children?.map((c) => {
      const children = c.children as any

      return {
        path: `/templates/${r.path}/${c.path}`,
        title: c.meta?.name || title(c.path),
        type: 'Templates',
        category: `${r.path} templates`,
        coverUrl: children[0].meta?.cover || '/cover/templates/default.png',
        _raw: c,
      }
    }) as any

    allChildrens.push(...restChildrens)
  })

  return allChildrens
})
const getGroupedTemplateRoutes = computed(() => {
  const grouped = group(getTemplateRoutes.value, (f: any) => f.category)
  return grouped
})
</script>

<template>
  <MpFlex flexDirection="column" minHeight="100vh" bg="background.surface">
    <MpFlex direction="column" alignItems="center" justifyContent="center" pt="8" px="8" gap="4">
      <MpFlex>
        <img
          :class="css({ display: 'block', _dark: { display: 'none' } })"
          src="https://cdn.mekari.design/logo/pixel/default.svg"
          alt=""
          height="56"
          width="auto"
        >

        <img
          :class="css({ display: 'none', _dark: { display: 'block' } })"
          src="https://cdn.mekari.design/logo/pixel/white.svg"
          alt=""
          height="56"
          width="auto"
        >
      </MpFlex>

      <MpInputGroup>
        <MpInput placeholder="Search..." :isClearable="true" />
      </MpInputGroup>
    </MpFlex>

    <div
      :class="
        css({
          p: 8,
          width: 'full',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        })
      "
    >
      <section>
        <MpText size="h2" :class="css({ mb: 2 })">
          Patterns
        </MpText>

        <div
          :class="
            css({
              display: 'grid',
              gridTemplateColumns: '1',
              gap: 4,
              sm: {
                gridTemplateColumns: '1',
              },
              md: {
                gridTemplateColumns: '3',
              },
              lg: {
                gridTemplateColumns: '4',
              },
              xl: {
                gridTemplateColumns: '6',
              },
            })
          "
        >
          <RouterLink
            v-for="(route, index) in getPatternRoutes"
            :key="index"
            :to="route.path"
            :class="
              css({
                rounded: 'xl',
                bg: 'background.neutral',
                width: 'full',
                cursor: 'pointer',
                borderWidth: '1px',
                borderColor: 'border.default',
                _hover: {
                  transition: 'box-shadow 300ms',
                  shadow: 'sm',
                },
              })
            "
          >
            <img
              :class="
                css({
                  roundedTop: 'xl',
                  objectFit: 'cover',
                })
              "
              src="/cover/patterns/default.png"
              alt=""
            >

            <div
              :class="
                css({
                  borderTopWidth: '1px',
                  borderColor: 'border.default',
                  padding: 4,
                  roundedBottom: 'xl',
                })
              "
            >
              <MpBadge size="sm" variant="subtle">
                Patterns
              </MpBadge>

              <MpText
                weight="semiBold"
                size="h3"
                :class="
                  css({
                    mt: 2,
                  })
                "
              >
                {{ route.title }}
              </MpText>
            </div>
          </RouterLink>
        </div>
      </section>

      <section v-for="key in Object.keys(getGroupedTemplateRoutes)" :key="key">
        <MpText size="h2" :class="css({ mb: 2 })">
          {{ title(key) }}
        </MpText>

        <div
          :class="
            css({
              display: 'grid',
              gridTemplateColumns: '6',
              gap: 4,
            })
          "
        >
          <RouterLink
            v-for="template in getGroupedTemplateRoutes[key]"
            :key="template.path"
            :to="template.path"
            :class="
              css({
                rounded: 'xl',
                bg: 'background.neutral',
                width: 'full',
                cursor: 'pointer',
                borderWidth: '1px',
                borderColor: 'border.default',
                _hover: {
                  transition: 'box-shadow 300ms',
                  shadow: 'sm',
                },
              })
            "
          >
            <img
              :class="
                css({
                  roundedTop: 'xl',
                  objectFit: 'cover',
                })
              "
              :src="template.coverUrl"
              alt=""
            >

            <div
              :class="
                css({
                  borderTopWidth: '1px',
                  borderColor: 'gray.50',
                  padding: 4,
                  roundedBottom: 'xl',
                })
              "
            >
              <MpBadge size="sm" variant="subtle">
                Templates
              </MpBadge>

              <MpText
                weight="semiBold"
                size="h3"
                :class="
                  css({
                    mt: 2,
                  })
                "
              >
                {{ template.title }}
              </MpText>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </MpFlex>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    MpAutocomplete,
    Pixel,
    MpButton,
    MpCheckbox,
    MpFlex,
    MpInput,
    MpText,
    MpTextarea,
    css
  } from '@mekari/pixel3'
  import NotificationItem from '../components/NotificationItem.vue'
  import { CATEGORY_MAP, type NotificationCategory } from '../components/utils.js'
  interface FormState {
    category: NotificationCategory
    name: string
    title: string
    message: string
    timestamp: string
    isRead: boolean
  }

  // Reactive state
  const formState = ref<FormState>({
    category: 'avatar',
    name: 'John Doe',
    title: 'New message received',
    message: 'You have received a new message from John Doe. Click to view the conversation.',
    timestamp: '2 minutes ago',
    isRead: false
  })

  const categoryOptions = Object.values(CATEGORY_MAP).map((category) => ({
    value: category,
    label: category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }))

  // Methods
  function handleNotificationClick(notification: any) {
    console.log('Notification clicked:', notification)
  }

  function handleMarkAsRead(notification: any) {
    console.log('Mark as read:', notification)
    formState.value.isRead = true
  }

  function resetForm() {
    formState.value = {
      category: 'avatar',
      name: 'John Doe',
      title: 'New message received',
      message: 'You have received a new message from John Doe. Click to view the conversation.',
      timestamp: '2 minutes ago',
      isRead: false
    }
  }

  function updateNameVisibility(newCategory: NotificationCategory) {
    if (newCategory && newCategory !== 'avatar') {
      formState.value.name = ''
    } else if (newCategory === 'avatar' && !formState.value.name) {
      formState.value.name = 'John Doe'
    }
  }
</script>

<template>
  <Pixel.div
    :class="
      css({
        backgroundColor: 'background.stage',
        borderRadius: 'md',
        boxShadow: 'lg',
        borderWidth: '1px',
        borderColor: 'gray.400',
        width: '500px',
        padding: '6'
      })
    "
  >
    <MpText
      size="h1"
      :class="
        css({
          fontWeight: 'semiBold',
          marginBottom: '6'
        })
      "
    >
      NotificationItem Showcase
    </MpText>

    <MpFlex
      :class="
        css({
          flexDirection: 'column',
          gap: '8'
        })
      "
    >
      <!-- Preview Section -->
      <Pixel.div
        :class="
          css({
            width: '100%'
          })
        "
      >
        <MpText
          size="h3"
          :class="
            css({
              fontWeight: 'semiBold',
              marginBottom: '4'
            })
          "
        >
          Preview
        </MpText>

        <Pixel.div
          :class="
            css({
              border: '1px dashed',
              borderColor: 'gray.100',
              borderRadius: 'lg',
              padding: '0.5'
            })
          "
        >
          <NotificationItem
            :category="formState.category"
            :name="formState.name"
            :title="formState.title"
            :message="formState.message"
            :timestamp="formState.timestamp"
            :has-read="formState.isRead"
            @click="handleNotificationClick"
            @mark-as-read="handleMarkAsRead"
          />
        </Pixel.div>
      </Pixel.div>

      <!-- Controls Section -->
      <Pixel.div
        :class="
          css({
            width: '100%'
          })
        "
      >
        <MpText
          size="h3"
          :class="
            css({
              fontWeight: 'semiBold',
              marginBottom: '4'
            })
          "
        >
          Controls
        </MpText>

        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              gap: '4'
            })
          "
        >
          <!-- Category Select -->
          <MpFlex
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpText
              :class="
                css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700'
                })
              "
            >
              Category
            </MpText>
            <MpAutocomplete
              v-model="formState.category"
              :data="categoryOptions"
              :content-style="{ width: 'full' }"
              @input="updateNameVisibility"
            />
          </MpFlex>

          <!-- Name Input (only for avatar category) -->
          <MpFlex
            v-if="formState.category === 'avatar'"
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpText
              :class="
                css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700'
                })
              "
            >
              Name
            </MpText>
            <MpInput v-model="formState.name" placeholder="Enter user name" />
          </MpFlex>

          <!-- Title Input -->
          <MpFlex
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpText
              :class="
                css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700'
                })
              "
            >
              Title
            </MpText>
            <MpInput v-model="formState.title" placeholder="Enter notification title" />
          </MpFlex>

          <!-- Message Textarea -->
          <MpFlex
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpText
              :class="
                css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700'
                })
              "
            >
              Message
            </MpText>
            <MpTextarea
              v-model="formState.message"
              placeholder="Enter notification message"
              rows="3"
            />
          </MpFlex>

          <!-- Timestamp Input -->
          <MpFlex
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpText
              :class="
                css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'gray.700'
                })
              "
            >
              Timestamp
            </MpText>
            <MpInput
              v-model="formState.timestamp"
              placeholder="Enter timestamp (e.g., '2 minutes ago')"
            />
          </MpFlex>

          <!-- Read Status Checkbox -->
          <MpFlex
            :class="
              css({
                flexDirection: 'column',
                gap: '2'
              })
            "
          >
            <MpCheckbox
              :is-checked="formState.isRead"
              @change="formState.isRead = !formState.isRead"
            >
              Mark as read
            </MpCheckbox>
          </MpFlex>

          <!-- Reset Button -->
          <MpButton variant="outline" @click="resetForm"> Reset to Default </MpButton>
        </MpFlex>
      </Pixel.div>
    </MpFlex>
  </Pixel.div>
</template>

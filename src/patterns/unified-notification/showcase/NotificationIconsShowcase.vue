<script setup lang="ts">
  import { Pixel, MpFlex, MpText, css } from '@mekari/pixel3'
  import NotificationIcon from '../components/NotificationIcon.vue'
</script>

<template>
  <!-- Notification Icons Showcase -->
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
          marginBottom: '6',
          textAlign: 'center'
        })
      "
    >
      Notification Icons Showcase
    </MpText>

    <!-- Avatar Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '8'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Avatar Icons (A-Z)
      </MpText>
      <MpFlex
        :class="
          css({
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
          :key="letter"
          direction="column"
          align-items="center"
          gap="1"
        >
          <NotificationIcon category="avatar" :name="letter" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            {{ letter }}
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>

    <!-- Reminder Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '8'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Reminder Icons
      </MpText>
      <MpFlex
        :class="
          css({
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="reminder" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            reminder
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>

    <!-- Channel Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '8'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Channel Icons
      </MpText>
      <MpFlex
        :class="
          css({
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-email" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            email
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-facebook" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            facebook
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-google-business" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            google business
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-instagram" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            instagram
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-line" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            line
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-shopee" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            shopee
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-telegram" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            telegram
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-tokopedia" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            tokopedia
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-whatsapp" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            whatsapp
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-x" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            x (twitter)
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-web-chat" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            web chat
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-mobile-chat" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            mobile chat
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-whatsapp-group" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            whatsapp group
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="channel-blocked-contact" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            blocked contact
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>

    <!-- Assignment Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '8'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Assignment Icons
      </MpText>
      <MpFlex
        :class="
          css({
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="assignment-inbox" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            inbox
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="assignment-ticket" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            ticket
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="assignment-deals" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            deals
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="assignment-task" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            task
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="assignment-customer" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            customer
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>

    <!-- Download/Upload Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '8'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Download/Upload Icons
      </MpText>
      <MpFlex
        :class="
          css({
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-general" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            general
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-deals" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            deals
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-ticket" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            ticket
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-report" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            report
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-company" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            company
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-task" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            task
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-product" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            product
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="download-upload-expense" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            expense
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>

    <!-- Update Category -->
    <Pixel.div
      :class="
        css({
          marginBottom: '4'
        })
      "
    >
      <MpText
        size="h3"
        :class="
          css({
            fontWeight: 'semiBold',
            marginBottom: '4',
            color: 'gray.700'
          })
        "
      >
        Update Icons
      </MpText>
      <MpFlex
        :class="
          css({
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center'
          })
        "
      >
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="update-general" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            general
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="update-deals" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            deals
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="update-ticket" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            ticket
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="update-company" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            company
          </MpText>
        </MpFlex>
        <MpFlex
          :class="
            css({
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1'
            })
          "
        >
          <NotificationIcon category="update-task" />
          <MpText
            :class="
              css({
                fontSize: 'xs',
                color: 'gray.600'
              })
            "
          >
            task
          </MpText>
        </MpFlex>
      </MpFlex>
    </Pixel.div>
  </Pixel.div>
</template>

import type { PropType } from 'vue'
import type { IconName } from '@mekari/pixel3'
import { MpIcon, MpPopover, MpPopoverContent, MpPopoverList, MpPopoverListItem, MpPopoverTrigger, MpText, css } from '@mekari/pixel3'
import { defineComponent } from 'vue'
import { sva } from '@mekari/pixel3-styled-system/css'

export const SideItemProps = {
  isActive: Boolean,
  icon: String as PropType<IconName>,
  label: String,
  isArrow: Boolean,
  isHideLabel: Boolean,
}

const sidebarItemClasses = sva({
  slots: ['parent', 'wrapper', 'root', 'icon', 'label', 'arrow'],
  base: {
    parent: {
      flex: '1',
      p: 2,
      rounded: 'md',
      cursor: 'pointer',
      transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
    },
    wrapper: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    root: { display: 'flex', alignItems: 'center', gap: 2 },
    icon: { _groupHover: { color: 'blue.400' } },
    label: {
      'whiteSpace': 'nowrap',
      'opacity': 100,
      'transition': 'opacity 300ms',
      '&[data-hide-label=true]': {
        opacity: 0,
      },
      '_groupHover': { color: 'blue.400' },
    },
    arrow: {
      'opacity': 100,
      'transition': 'opacity 300ms',
      '&[data-hide-arrow=true]': {
        opacity: 0,
      },
    },
  },
  variants: {
    isActive: {
      true: {
        parent: { backgroundColor: 'blue.100' },
        icon: { color: 'blue.400' },
      },
    },
  },
})

export const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: SideItemProps,
  setup(props) {
    const classes = sidebarItemClasses({ isActive: props.isActive })

    return () => (
      <li class={['group', classes.parent]}>
        <div class={classes.wrapper}>
          <div class={classes.root}>
            <MpIcon
              name={props.icon || 'empty'}
              variant={props.isActive ? 'fill' : 'outline'}
              class={classes.icon}
            />
            <MpText
              class={classes.label}
              weight={props.isActive ? 'semiBold' : 'regular'}
              color={props.isActive ? 'blue.400' : 'dark'}
              data-hide-label={props.isHideLabel || undefined}
            >
              {props.label}
            </MpText>
          </div>

          {props.isArrow && <MpIcon name="chevrons-right" class={classes.arrow} data-hide-arrow={props.isHideLabel || undefined} />}
        </div>
      </li>
    )
  },
})

const listItem = css({
  color: 'white',
  _hover: {
    background: 'blue.400',
  },
})
export const SidebarItemWithChild = defineComponent({
  name: 'SidebarItemChild',
  props: SideItemProps,
  setup(props) {
    return () => {
      return (
        <MpPopover trigger="hover" placement="right" usePortal>
          <MpPopoverTrigger>
            <SidebarItem {...props} isArrow={true} />
          </MpPopoverTrigger>

          <MpPopoverContent class={css({
            width: 'full',
            maxWidth: '56',
            backgroundColor: 'overlay',
            boxShadow: 'lg',
            borderWidth: '0px',
          })}
          >
            <MpPopoverList>
              <MpPopoverListItem class={listItem}>
                Content 1
              </MpPopoverListItem>
            </MpPopoverList>
          </MpPopoverContent>
        </MpPopover>
      )
    }
  },
})

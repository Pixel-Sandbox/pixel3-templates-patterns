import { sva } from '@mekari/pixel3-styled-system/css'

export const sidebar = sva({
  slots: ['root', 'rootChild', 'menu', 'mainMenu', 'bottomAction'],
  base: {
    root: {
      flex: 'none',
      transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
      zIndex: '100',
    },
    rootChild: {
      position: 'fixed',
      display: 'flex',
      marginRight: '60px',
      transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
    },
    menu: {
      background: 'background',
      display: 'block',
      paddingTop: 'var(--pixel-navbar-height)',
      transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
    },
    mainMenu: {
      pt: 4,
      px: 2,
      height: 'calc(100vh - 56px)',
      width: 'full',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: '60px',
    },
    bottomAction: {
      position: 'sticky',
      bottom: '0',
      left: '0',
      p: 2,
      borderTopWidth: '1px',
      borderColor: 'gray.100',
      background: 'background',
      w: 'full',
    },
  },
  variants: {
    isCollapsed: {
      true: {
        root: { width: '60px' },
        menu: {
          width: '60px',
          position: 'relative',
        },
      },
      false: {
        root: { width: '216px' },
        menu: {
          width: '216px',
          position: 'absolute',
        },
      },
    },
    isChildCollapsed: {
      true: {
        root: {
          shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
      false: {
        root: {
          shadow: 'none',
        },
      },
    },
  },
  defaultVariants: {
    isCollapsed: true,
    isChildCollapsed: false,
  },
})

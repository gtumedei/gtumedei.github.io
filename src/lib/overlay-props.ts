/** Factory function for common props used in Ark UI overlay components (e.g. Dialog, Popover). */
export const overlayProps = ({
  modal = true,
  blockToasts = false,
}: {
  /** Block outside interactions, defaults to `true`. */
  modal?: boolean
  /** Block interaction with toasts, defaults to `false`. */
  blockToasts?: boolean
} = {}) => {
  return {
    lazyMount: true,
    unmountOnExit: true,
    modal,
    persistentElements: blockToasts ? [] : [() => document.querySelector("[data-sonner-toaster]")],
  }
}

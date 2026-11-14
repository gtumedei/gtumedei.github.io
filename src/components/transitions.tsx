import { Transition } from "solid-transition-group"

export const OpacityTransition: typeof Transition = (props) => {
  return (
    <Transition
      appear
      enterClass="opacity-0"
      exitToClass="opacity-0"
      enterActiveClass="transition-opacity"
      exitActiveClass="transition-opacity"
      mode="outin"
      {...props}
    />
  )
}

export const OpacityBlurTransition: typeof Transition = (props) => {
  return (
    <Transition
      appear
      enterClass="opacity-0 backdrop-blur-[3px]"
      exitToClass="opacity-0 backdrop-blur-[3px]"
      enterActiveClass="transition-all"
      exitActiveClass="transition-all"
      mode="outin"
      {...props}
    />
  )
}

import { Transition } from "solid-transition-group"

const OpacityTransition: typeof Transition = (props) => {
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

export default OpacityTransition

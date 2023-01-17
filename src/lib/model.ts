import { Accessor, createRenderEffect, onCleanup, Setter } from "solid-js"

const model = (elem: HTMLInputElement, value: () => [Accessor<string>, Setter<string>]) => {
  const [field, setField] = value()

  createRenderEffect(() => (elem.value = field()))

  const onInput = (e: Event) => setField((e as any).target?.value ?? "")
  elem.addEventListener("input", onInput)
  onCleanup(() => elem.removeEventListener("input", onInput))
}

export default model

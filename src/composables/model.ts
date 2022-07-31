import { Accessor, createRenderEffect, onCleanup, onMount, Setter } from "solid-js";

const model = (elem: HTMLInputElement, value: () => [Accessor<string>, Setter<string>]) => {
  const [field, setField] = value()

  createRenderEffect(() => (elem.value = field()))

  const onInput = (e: Event) => setField((e as any).target?.value ?? "")
  onMount(() => elem.addEventListener("input", onInput))
  onCleanup(() => elem.removeEventListener("input", onInput))
}

export default model

import { Component, createMemo, createSignal, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import model from "~/lib/directives/model"; model
import tooltip from "~/lib/directives/tooltip"; tooltip
import { createTimeline, stagger } from "~/lib/motion"
import LoadingSpinner from "~/lib/ui/loading-spinner"
import Modal from "~/lib/ui/modal"
import type { ContactApiSchema } from "~/pages/api/contact"
import MdiAccountOutline from "~icons/mdi/account-outline"
import MdiAlertCircleOutline from "~icons/mdi/alert-circle-outline"
import MdiEmailOutline from "~icons/mdi/email-outline"
import MdiEmoticonConfusedOutline from "~icons/mdi/emoticon-confused-outline"
import MdiRocketLaunchOutline from "~icons/mdi/rocket-launch-outline"
import MdiSend from "~icons/mdi/send"

const ContactForm: Component<{ class?: string }> = (props) => {
  const defaultData: ContactApiSchema = { name: "", email: "", subject: "", message: "" }
  const [data, setData] = createStore({ ...defaultData })

  const [isLoading, setIsLoading] = createSignal(false)
  const [showSuccessModal, setShowSuccessModal] = createSignal(false)
  const [showErrorModal, setShowErrorModal] = createSignal(false)

  const isEmailValid = createMemo(() => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
  const canSubmit = createMemo(() => !isLoading() && data.name != "" && isEmailValid() && data.subject != "" && data.message != "")

  const sendMessage = async (message: ContactApiSchema) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(message)
    })
    if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    if (!canSubmit()) return
    setIsLoading(true)
    try {
      await sendMessage(data)
      setData({ ...defaultData })
      setShowSuccessModal(true)
    } catch (e) {
      console.error(e)
      setShowErrorModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  let nameInput!: HTMLInputElement
  onMount(() => nameInput.focus())

  return (
    <>
      <form class={`${props.class ?? ""} flex flex-col`} onSubmit={onSubmit}>
        <div class="
          grid w-full m-auto gap-6
          [grid-template-areas:'name'_'email'_'subject'_'message'_'submit']
          lg:[grid-template-areas:'name_email''subject_subject''message_message''submit_submit']
        ">
          <fieldset class="fieldset [grid-area:name]">
            <label class="label" for="contact-name">Name</label>
            <MdiAccountOutline />
            <input
              id="contact-name"
              class="input"
              ref={nameInput}
              type="text"
              use:model={[() => data.name, (v) => setData("name", v.trim())]}
            />
          </fieldset>

          <fieldset class="fieldset [grid-area:email]">
            <label class="label" for="contact-email">Email</label>
            <MdiEmailOutline />
            <input
              id="contact-email"
              class="input"
              type="text"
              autocapitalize="off"
              use:model={[() => data.email, (v) => setData("email", v.trim())]}
            />
            <div
              class={`
                absolute bottom-4 right-4 text-[#FF5252] transition-opacity flex
                ${isEmailValid() || data.email == "" ? "opacity-0 pointer-events-none" : ""}
              `}
              use:tooltip={["Invalid email address", "top"]}
            ><MdiAlertCircleOutline /></div>
          </fieldset>

          <fieldset class="fieldset [grid-area:subject]">
            <label class="label" for="contact-subject">Subject</label>
            <input
              id="contact-subject"
              class="input"
              type="text"
              use:model={[() => data.subject, (v) => setData("subject", v.trim())]}
            />
          </fieldset>

          <fieldset class="fieldset [grid-area:message]">
            <label class="label" for="contact-message">Message</label>
            <textarea
              id="contact-message"
              class="textarea"
              rows="9"
              use:model={[() => data.message, (v) => setData("message", v.trim())]}
            />
          </fieldset>

          <button
            type="submit"
            class={`btn btn-accent [grid-area:submit] relative w-44 mt-6 mx-auto ${isLoading() ? "loading" : ""}`}
            disabled={!canSubmit()}
          >
            <div class={`flex gap-4 transition-opacity ${isLoading() ? "opacity-0" : ""}`}>
              <span>Send</span>
              <MdiSend />
            </div>
            <div class={`absolute-center transition-opacity ${!isLoading() ? "opacity-0" : ""}`}>
              <LoadingSpinner inverted />
            </div>
          </button>
        </div>
      </form>

      <Modal
        class="flex flex-col items-center text-center w-96"
        show={showSuccessModal()}
        setShow={setShowSuccessModal}
      >
        <div class="bg-primary-focus flex rounded-full p-6 mb-6">
          <MdiRocketLaunchOutline class="text-xl text-accent" />
        </div>
        <h4 class="section-subheading mb-2">Message sent</h4>
        <p class="text-sm mb-8">
          Thanks for reaching out to me.<br/>I'll reply as soon as possible!
        </p>
        <button class="btn btn-accent w-1/2" onClick={() => setShowSuccessModal(false)}>Close</button>
      </Modal>

      <Modal
        class="flex flex-col items-center text-center w-[28rem]"
        show={showErrorModal()}
        setShow={setShowErrorModal}
      >
        <div class="bg-primary-focus flex rounded-full p-6 mb-6">
          <MdiEmoticonConfusedOutline class="text-xl text-accent" />
        </div>
        <h4 class="section-subheading mb-2">Oops! <br class="sm:hidden"/> Something went wrong</h4>
        <p class="text-sm mb-8">
          Looks like the message wasn't sent.<br/>
          Please check if something strange is going on with your internet connection.
          If that's not the case, then it's probably my fault 😅
        </p>
        <button class="btn btn-accent w-1/2" onClick={() => setShowErrorModal(false)}>Close</button>
      </Modal>
    </>
  )
}

const ContactPage = () => {

  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [".motion-2", { opacity: 1, y: [-10, 0] }, { duration: 0.4, at: "<" }]
  ])

  return (
    <>
      <h1 class="motion-1 section-heading mt-9 mb-2">Contact</h1>
      <p class="motion-1 mb-12">
        Whether you want to hire me or just say hi, you can get in touch with me by filling the form below.
      </p>
      <ContactForm class="motion-2" />
    </>
  )
}

export default ContactPage

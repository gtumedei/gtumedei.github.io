import { Component, createMemo, createSignal, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import LoadingSpinner from "~/components/ui/loading-spinner"
import Modal from "~/components/ui/modal"
import model from "~/composables/model"
import tooltip from "~/composables/tooltip"
import { Message, sendMessage } from "~/composables/supabase"
import MdiAccountOutline from "~icons/mdi/account-outline"
import MdiAlertCircleOutline from "~icons/mdi/alert-circle-outline"
import MdiEmailOutline from "~icons/mdi/email-outline"
import MdiEmoticonConfusedOutline from "~icons/mdi/emoticon-confused-outline"
import MdiRocketLaunchOutline from "~icons/mdi/rocket-launch-outline"
import MdiSend from "~icons/mdi/send"

model; tooltip;

const ContactForm: Component = () => {
  const defaultData: Message = { name: "", email: "", subject: "", message: "" }
  const [data, setData] = createStore({ ...defaultData })

  const [isLoading, setIsLoading] = createSignal(false)
  const [showSuccessModal, setShowSuccessModal] = createSignal(false)
  const [showErrorModal, setShowErrorModal] = createSignal(false)

  const isEmailValid = createMemo(() => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
  const canSubmit = createMemo(() => !isLoading() && data.name != "" && isEmailValid() && data.subject != "" && data.message != "")

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    if (!canSubmit()) return
    setIsLoading(true)
    try {
      await sendMessage(data)
      setData(defaultData)
      setShowSuccessModal(true)
    } catch {
      setShowErrorModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  let nameInput!: HTMLInputElement
  onMount(() => nameInput.focus())

  return (
    <>
      <form class="flex flex-col" onSubmit={onSubmit}>
        <div class="contact-form-grid grid w-full m-auto gap-x-6 gap-y-4">
          <fieldset class="name-field">
            <label for="contact-name">Name</label>
            <MdiAccountOutline />
            <input id="contact-name" type="text" use:model={[() => data.name, (v) => setData("name", v)]} ref={nameInput} />
          </fieldset>

          <fieldset class="email-field">
            <label for="contact-email">Email</label>
            <MdiEmailOutline />
            <input id="contact-email" type="text" use:model={[() => data.email, (v) => setData("email", v)]} />
            <div
              class={`
                absolute bottom-4 right-4 text-[#FF5252] transition-opacity flex
                ${isEmailValid() || data.email == "" ? "opacity-0 pointer-events-none" : ""}
              `}
              aria-label="Invalid email address"
              use:tooltip={[() => "Invalid email address", "top"]}
            ><MdiAlertCircleOutline /></div>
          </fieldset>

          <fieldset class="subject-field">
            <label for="contact-subject">Subject</label>
            <input id="contact-subject" type="text" use:model={[() => data.subject, (v) => setData("subject", v)]} />
          </fieldset>

          <fieldset class="message-field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" rows="9" use:model={[() => data.message, (v) => setData("message", v)]} />
          </fieldset>

          <button type="submit" class="btn accent relative mt-4 mx-auto" disabled={!canSubmit()}>
            <div class={`flex gap-4 transition-opacity ${isLoading() ? "opacity-0" : ""}`}>
              <span>Send</span>
              <MdiSend />
            </div>
            <div class={`absolute-center transition-opacity ${!isLoading() ? "opacity-0" : ""}`}>
              <LoadingSpinner inverted/>
            </div>
          </button>
        </div>
      </form>

      <Modal show={showSuccessModal} setShow={setShowSuccessModal}>
        <div class="flex flex-col items-center text-center w-96">
          <div class="bg-primary-dark flex rounded-full p-6 mb-8">
            <MdiRocketLaunchOutline class="text-3xl text-accent" />
          </div>
          <h4 class="section-subheading mb-2">Message sent</h4>
          <p class="text-sm mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, voluptatum?</p>
          <button class="btn accent py-3" onClick={() => setShowSuccessModal(false)}>Close</button>
        </div>
      </Modal>

      <Modal show={showErrorModal} setShow={setShowErrorModal}>
        <div class="flex flex-col items-center text-center w-96">
          <div class="bg-primary-dark flex rounded-full p-6 mb-8">
            <MdiEmoticonConfusedOutline class="text-3xl text-accent" />
          </div>
          <h4 class="section-subheading mb-2">Oops!<br/>Something went wrong</h4>
          <p class="text-sm mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, voluptatum?</p>
          <button class="btn accent py-3" onClick={() => setShowErrorModal(false)}>Close</button>
        </div>
      </Modal>

      <style>{`
        .contact-form-grid {
          grid-template-areas:
            "name"
            "email"
            "subject"
            "message"
            "button";
        }
        @media (min-width: 1024px) {
          .contact-form-grid {
            grid-template-areas:
              "name email"
              "subject subject"
              "message message"
              "button button";
          }
        }
        .name-field { grid-area: name; }
        .email-field { grid-area: email; }
        .subject-field { grid-area: subject; }
        .message-field { grid-area: message; }
        .btn { grid-area: button; }
      `}</style>
    </>
  )
}

const ContactPage: Component = () => {
  return (
    <>
      <h1 class="text-4xl font-bold tracking-wider mb-2">Contact</h1>
      <p class="font-mono mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi iure earum placeat, labore iusto rem dolore temporibus praesentium quibusdam?</p>
      <ContactForm />
    </>
  )
}

export default ContactPage

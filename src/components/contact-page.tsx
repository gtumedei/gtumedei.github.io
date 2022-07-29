import { Component, onMount } from "solid-js"
import MdiAccountOutline from "~icons/mdi/account-outline"
import MdiArrowLeftThin from "~icons/mdi/arrow-left-thin"
import MdiEmailOutline from "~icons/mdi/email-outline"
import MdiSend from "~icons/mdi/send"

const ContactForm: Component = () => {
  let nameInput!: HTMLInputElement

  onMount(() => nameInput.focus())

  return (
    <form class="flex flex-col">
      <div class="contact-form-grid grid w-full m-auto gap-x-6 gap-y-4">
        <fieldset class="name-field">
          <label for="contact-name">Name</label>
          <MdiAccountOutline />
          <input id="contact-name" type="text" ref={nameInput} />
        </fieldset>
        <fieldset class="email-field">
          <label for="contact-email">Email</label>
          <MdiEmailOutline />
          <input id="contact-email" type="text" />
          {/* <div
            ref="errorIcon"
            :class="`error-icon flex ${isEmailValid || data.email == '' ? 'opacity-0 pointer-events-none' : ''}`"
          ><icon name="mdi:alert-circle-outline"/></div> */}
        </fieldset>
        <fieldset class="subject-field">
          <label for="contact-subject">Subject</label>
          <input id="contact-subject" type="text" />
        </fieldset>
        <fieldset class="message-field">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" rows="9"></textarea>
        </fieldset>
        <button type="submit" class="btn inverted relative mt-4 mx-auto" disabled={false/* !canSubmit || isLoading */}>
          <div class={`flex gap-4 transition-opacity ${/* isLoading */false ? "opacity-0" : ""}`}>
            <span>Send</span>
            <MdiSend />
          </div>
          {/* <div :class="`absolute-center transition-opacity ${!isLoading ? "opacity-0" : ""}`">
            <loading-spinner inverted/>
          </div> */}
        </button>
      </div>

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

        .error-icon { @apply
          absolute bottom-4 right-4 text-[#FF5252] transition-opacity;
        }
      `}</style>
    </form>
  )
}

const ContactPage: Component = () => {
  return (
    <main class="container max-w-4xl p-6">
      <a href="/" class="btn icon -m-l-3 my-0 !text-xl mb-6">
        <MdiArrowLeftThin />
      </a>
      <h1 class="text-4xl font-bold tracking-wider mb-2">Contact</h1>
      <p class="font-mono text-secondary mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi iure earum placeat, labore iusto rem dolore temporibus praesentium quibusdam?</p>
      <ContactForm />
    </main>
  )
}

export default ContactPage

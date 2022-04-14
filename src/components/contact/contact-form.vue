<script lang="ts" setup>
import { computed, ref, unref } from "vue"
import Icon from "@/components/ui/icon.vue"
import LoadingSpinner from "@/components/ui/loading-spinner.vue"
import Modal from "@/components/ui/modal.vue"
import { sendMessage, useTippy } from "@/composables"
import { Message } from "@/types"

const initialData: Message = {
  name: "",
  email: "",
  subject: "",
  message: ""
}
const data = ref<Message>({ ...initialData })

const isLoading = ref(false)
const showModal = ref(false)

const isEmailValid = computed(() => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.value.email))

const canSubmit = computed(() => data.value.name != "" && isEmailValid.value && data.value.subject != "" && data.value.message != "")

const onSubmit = async () => {
  if (!canSubmit.value) return
  isLoading.value = true
  const message = unref(data)
  await sendMessage(message)
  await new Promise(r => setTimeout(r, 2000))
  data.value = { ...initialData }
  isLoading.value = false
  showModal.value = true
}

const errorIcon = ref<HTMLElement>()
useTippy(errorIcon, "ui.back_to_top_btn_title", "top")
</script>

<template>
  <form class="contact-form" @submit.prevent="onSubmit">
    <h3 class="font-serif text-2xl mb-2">Send me a message</h3>

    <fieldset class="name-field">
      <label for="contact-name">Name</label>
      <icon name="mdi:account-outline"/>
      <input id="contact-name" type="text" v-model="data.name"/>
    </fieldset>
    <fieldset class="email-field">
      <label for="contact-email">Email</label>
      <icon name="mdi:email-outline"/>
      <input id="contact-email" type="text" v-model="data.email"/>
      <div
        ref="errorIcon"
        :class="`error-icon flex ${isEmailValid || data.email == '' ? 'opacity-0 pointer-events-none' : ''}`"
      ><icon name="mdi:alert-circle-outline"/></div>
    </fieldset>
    <fieldset class="subject-field">
      <label for="contact-subject">Subject</label>
      <input id="contact-subject" type="text" v-model="data.subject"/>
    </fieldset>
    <fieldset class="message-field">
      <label for="contact-message">Message</label>
      <textarea id="contact-message" type="text" rows="4" v-model="data.message"></textarea>
    </fieldset>

    <button type="submit" class="btn inverted relative mt-4 mx-auto" :disabled="!canSubmit || isLoading">
      <div :class="`flex gap-4 transition-opacity ${isLoading ? 'opacity-0' : ''}`">
        <span>Send</span>
        <icon name="mdi:send"/>
      </div>
      <div :class="`absolute-center transition-opacity ${!isLoading ? 'opacity-0' : ''}`">
        <loading-spinner inverted/>
      </div>
    </button>

    <modal v-model:show="showModal">
      <div class="flex flex-col items-center text-center max-w-96">
        <div class="bg-primary-dark flex rounded-full p-6 mb-8">
          <icon name="mdi:rocket-launch-outline" class="!text-3xl"/>
        </div>
        <h4 class="font-serif text-xl mb-2">Message sent</h4>
        <p class="mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, voluptatum?</p>
        <button class="btn inverted py-3" @click="showModal = false">Close</button>
      </div>
    </modal>
  </form>
</template>

<style lang="postcss" scoped>

form {
  @apply grid w-full m-auto gap-x-6 gap-y-4;
  grid-template-areas:
    "title"
    "name"
    "email"
    "subject"
    "message"
    "button";

  @media (min-width: 1024px) {
    grid-template-areas:
      "title title"
      "name email"
      "subject subject"
      "message message"
      "button button";
  }
}

h3 { grid-area: title; }
.name-field { grid-area: name; }
.email-field { grid-area: email; }
.subject-field { grid-area: subject; }
.message-field { grid-area: message; }
.btn { grid-area: button; }

.error-icon { @apply
  absolute bottom-4 right-4 text-[#FF5252] transition-opacity;
}

</style>
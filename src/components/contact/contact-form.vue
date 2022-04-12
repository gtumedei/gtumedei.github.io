<script lang="ts" setup>
import { computed, reactive, ref } from "vue"
import Icon from "@/components/icon.vue"
import { useTippy } from "@/composables"

const data = reactive({
  name: "",
  email: "",
  subject: "",
  message: ""
})

const isEmailValid = computed(() => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))

const canSubmit = computed(() => data.name != "" && isEmailValid.value && data.subject != "" && data.message != "")

const onSubmit = () => {
  console.log(JSON.stringify(data, null, 2))
}

const errorIcon = ref<HTMLElement>()
useTippy(errorIcon, "ui.back_to_top_btn_title", "top")
</script>

<template>
  <form class="contact-form" @submit.prevent="onSubmit">
    <h3 class="font-serif text-2xl mb-2">Send me a message <span class="text-sm font-sans">(Not implemented yet)</span></h3>
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
    <button type="submit" class="btn inverted mt-4 mx-auto" :disabled="!canSubmit">
      <span>Send</span>
      <icon name="mdi:send"/>
    </button>
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

fieldset { @apply
  relative flex flex-col;

  label { @apply
    mb-2;
  }

  & > .icon { @apply
    absolute bottom-4 left-4;
  }

  .icon + input, .icon + textarea { @apply
    pl-12;
  }
}

input, textarea { @apply
  bg-primary-dark rounded-lg px-4 py-3 outline-none
  border-2 border-transparent focus:border-typography-faded
  transition-all resize-none;
}

.error-icon { @apply
  absolute bottom-4 right-4 text-[#FF5252] transition-opacity;
}

</style>
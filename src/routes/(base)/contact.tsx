import { DialogRootProps } from "@ark-ui/solid"
import { action, json, useAction } from "@solidjs/router"
import { Bot, GrammyError, HttpError } from "grammy"
import { animate, stagger } from "motion"
import outdent from "outdent"
import { Component, createSignal, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { z } from "zod"
import Meta from "~/components/meta"
import PageAvatar from "~/components/page-avatar-icon"
import { Button, button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { FormField } from "~/components/ui/form-field"
import { Input } from "~/components/ui/input"
import { Loading } from "~/components/ui/loading"
import { Textarea } from "~/components/ui/textarea"
import tooltip from "~/lib/directives/tooltip"
import env from "~/lib/env"
import { createForm } from "~/lib/form"
import { validated } from "~/lib/validation"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerExclamationCircle from "~icons/tabler/exclamation-circle"
import TablerMail from "~icons/tabler/mail"
import TablerRocket from "~icons/tabler/rocket"
import TablerUser from "~icons/tabler/user"

const SendMessageActionSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

const sendMessageAction = action(async (rawPayload: z.infer<typeof SendMessageActionSchema>) => {
  "use server"

  const payload = validated(rawPayload, SendMessageActionSchema)

  // Compose message
  const message = outdent`
    Hello Sir,
    *${payload.name}* ✉️[${payload.email}](${payload.email}) contacted you via the gtumedei.io form.


    *${payload.subject}*

    ${payload.message}
  `
  // Send message
  try {
    const bot = new Bot(env.private.TELEGRAM_BOT_TOKEN)
    await bot.api.sendMessage(env.private.TELEGRAM_CHAT_ID, message, { parse_mode: "Markdown" })
    console.log("Message sent", payload)
    return json({ message: "Message sent" })
  } catch (e) {
    if (e instanceof GrammyError) console.error("Error in request:", e.description)
    else if (e instanceof HttpError) console.error("Could not contact Telegram:", e)
    else console.error("Unknown error:", e)
    throw new Error("Failed to send the message")
  }
})

const ContactPage = () => {
  const sendMessage = useAction(sendMessageAction)

  const { form, errors, isValid, isSubmitting, reset } = createForm({
    schema: SendMessageActionSchema,
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        await sendMessage(values)
        setDialogState("success")
        reset()
      } catch (e) {
        console.error(e)
        setDialogState("error")
      }
    },
  })

  const [dialogState, setDialogState] = createSignal<"success" | "error" | null>(null)

  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
      [
        `[data-motion="form"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.075, { startDelay: 0.2 }), at: "<" },
      ],
    ])
  })

  form
  tooltip
  return (
    <>
      <Meta
        title="Contact"
        description="Want to work together or just talk? Reaching out is easy, and I usually reply pretty fast."
      />
      <div class="lg:w-2/3 px-6">
        <PageAvatar class="mb-8" data-motion="image">
          <PageAvatar.Icon>
            <TablerBrandTelegram />
          </PageAvatar.Icon>
        </PageAvatar>
        <h1 class="font-heading text-4xl sm:text-5xl mb-6" data-motion="heading">
          Contact
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          If you'd like to collaborate, ask something, or simply say hi, this form makes it
          straightforward. Send a message anytime, I'm generally quick to reply and always open to
          good conversations.
        </p>
      </div>
      <form use:form class="flex flex-col px-6 py-20">
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:leading-11!">Name</FormField.Label>
          <div class="md:col-span-3 sm:max-w-xs relative">
            <Input type="text" name="name" variant="outline" size="lg" class="w-full pl-12 peer" />
            <div class="h-8 w-8 flex peer-focus-visible:text-accent *:opacity-70 peer-hover:*:opacity-100 peer-focus-visible:*:opacity-100 transition-colors absolute-center-y left-2.5 pointer-events-none">
              <TablerUser class="m-auto transition-opacity" />
            </div>
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:leading-11!">Email</FormField.Label>
          <div class="md:col-span-3 sm:max-w-sm relative">
            <Input
              type="email"
              name="email"
              variant="outline"
              size="lg"
              class="w-full pl-12 pr-10 peer"
            />
            <div class="h-8 w-8 flex peer-focus-visible:text-accent *:opacity-70 peer-hover:*:opacity-100 peer-focus-visible:*:opacity-100 transition-colors absolute-center-y left-2.5 pointer-events-none">
              <TablerMail class="m-auto transition-opacity" />
            </div>
            {errors("email") && (
              <div
                class="h-8 w-8 flex text-error absolute bottom-1.5 right-1.5"
                use:tooltip={[() => errors("email")?.join(",") ?? "", "top"]}
              >
                <TablerExclamationCircle class="m-auto" />
              </div>
            )}
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:leading-11!">Subject</FormField.Label>
          <div class="md:col-span-3">
            <Input type="text" name="subject" variant="outline" size="lg" class="w-full" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:leading-11!">Message</FormField.Label>
          <div class="md:col-span-3 flex">
            <Textarea name="message" variant="outline" size="lg" class="w-full h-52" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <div class="grid md:grid-cols-5 gap-x-12" data-motion="form">
          <Button
            type="submit"
            variant="neutral"
            size="lg"
            class="text-sm md:col-span-3 md:col-start-2 sm:w-1/2 md:w-full lg:w-1/2 max-md:mt-3 sm:mx-auto md:mx-0 lg:mx-auto"
            disabled={!isValid() || isSubmitting()}
          >
            {isSubmitting() ? <Loading /> : "Send"}
          </Button>
        </div>
      </form>

      <SuccessDialog
        open={dialogState() == "success"}
        onOpenChange={({ open }) => setDialogState(open ? "success" : null)}
      />
      <ErrorDialog
        open={dialogState() == "error"}
        onOpenChange={({ open }) => setDialogState(open ? "error" : null)}
      />
    </>
  )
}

const SuccessDialog: Component<Pick<DialogRootProps, "open" | "onOpenChange">> = (props) => {
  return (
    <Dialog {...props} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-xs text-center">
            <div class="flex bg-base-300 text-accent rounded-full p-4 mx-auto">
              <TablerRocket class="text-2xl" />
            </div>
            <Dialog.Header class="gap-1.5">
              <Dialog.Title>Message sent</Dialog.Title>
              <Dialog.Description class="text-sm text-balance">
                Thanks for reaching out! I'll get back to you as soon as possible.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger class={button({ variant: "neutral" })}>Ok</Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

const ErrorDialog: Component<Pick<DialogRootProps, "open" | "onOpenChange">> = (props) => {
  return (
    <Dialog {...props} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-xs text-center">
            <div class="flex bg-base-300 text-error rounded-full p-4 mx-auto">
              <TablerExclamationCircle class="text-2xl" />
            </div>
            <Dialog.Header class="gap-1.5">
              <Dialog.Title>
                Oops! <br class="sm:hidden" /> Something went wrong
              </Dialog.Title>
              <Dialog.Description class="text-sm text-balance">
                Looks like the message wasn't sent.
                <br />
                Please check if something strange is going on with your internet connection. If
                that's not the case, then it's probably my fault 😅
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger class={button({ variant: "neutral" })}>Ok</Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

export default ContactPage

import { DialogRootProps } from "@ark-ui/solid"
import { A, json, useAction } from "@solidjs/router"
import { Bot, GrammyError, HttpError } from "grammy"
import outdent from "outdent"
import { Component, createSignal } from "solid-js"
import { Portal } from "solid-js/web"
import { z } from "zod"
import Seo from "~/components/seo"
import { Button, button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { FormField } from "~/components/ui/form-field"
import { Input } from "~/components/ui/input"
import { Loading } from "~/components/ui/loading"
import { Textarea } from "~/components/ui/textarea"
import tooltip from "~/lib/directives/tooltip"
import env from "~/lib/env"
import { createForm } from "~/lib/form"
import { createTimeline, stagger } from "~/lib/motion"
import { safeAction } from "~/lib/safe-data"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerExclamationCircle from "~icons/tabler/exclamation-circle"
import TablerMail from "~icons/tabler/mail"
import TablerRocket from "~icons/tabler/rocket"
import TablerUser from "~icons/tabler/user"

const SendMessageActionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

const sendMessageAction = safeAction(SendMessageActionSchema, async (payload) => {
  "use server"

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
      const res = await sendMessage(values)
      if (res.error) {
        setDialogState("error")
      } else {
        setDialogState("success")
        reset()
      }
    },
  })

  const [dialogState, setDialogState] = createSignal<"success" | "error" | null>(null)

  createTimeline([
    [
      `[data-motion="heading"]`,
      { opacity: 1, x: [-10, 0] },
      { duration: 0.4, delay: stagger(0.15) },
    ],
    [
      `[data-motion="form"]`,
      { opacity: 1, x: [-10, 0] },
      { duration: 0.4, delay: stagger(0.075, { start: 0.2 }), at: "<" },
    ],
  ])

  form
  tooltip
  return (
    <>
      <Seo
        title="Contact"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6"
          data-motion="heading"
        >
          Contact
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <form use:form class="flex flex-col px-6 py-20">
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Name</FormField.Label>
          <div class="md:col-span-3 sm:max-w-xs relative">
            <Input type="text" name="name" variant="outline" size="lg" class="w-full pl-12 peer" />
            <div class="h-8 w-8 flex bg-base-300 peer-hover:bg-accent/20 peer-hover:text-accent peer-focus-visible:bg-accent/20 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
              <TablerUser class="m-auto" />
            </div>
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Email</FormField.Label>
          <div class="md:col-span-3 sm:max-w-sm relative">
            <Input
              type="email"
              name="email"
              variant="outline"
              size="lg"
              class="w-full pl-12 peer"
            />
            <div class="h-8 w-8 flex bg-base-300 peer-hover:bg-accent/20 peer-hover:text-accent peer-focus-visible:bg-accent/20 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
              <TablerMail class="m-auto" />
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
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Subject</FormField.Label>
          <div class="md:col-span-3">
            <Input type="text" name="subject" variant="outline" size="lg" class="w-full" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12" data-motion="form">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Message</FormField.Label>
          <div class="md:col-span-3 flex">
            <Textarea name="message" variant="outline" size="lg" class="w-full h-52" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" data-motion="form" />
        <div class="grid md:grid-cols-5 gap-x-12" data-motion="form">
          <Button
            type="submit"
            theme="accent"
            class="md:col-span-3 md:col-start-2 sm:w-1/2 md:w-full lg:w-1/2 sm:mx-auto md:mx-0 lg:mx-auto"
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
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="flex bg-accent/15 text-accent rounded-full p-4 mx-auto">
              <TablerRocket class="text-2xl" />
            </div>
            <Dialog.Header class="gap-1.5">
              <Dialog.Title>Message sent</Dialog.Title>
              <Dialog.Description class="text-sm text-balance">
                Thanks for reaching out! I'll get back to you as soon as possible.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger class={button({ theme: "accent" })}>Ok</Dialog.CloseTrigger>
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
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="flex bg-error/15 text-error rounded-full p-4 mx-auto">
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
              <Dialog.CloseTrigger class={button({ theme: "error" })}>Ok</Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

export default ContactPage

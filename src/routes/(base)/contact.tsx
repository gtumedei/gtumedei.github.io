import { A } from "@solidjs/router"
import { Button, button } from "~/components/ui/button"
import { FormField } from "~/components/ui/form-field"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerMail from "~icons/tabler/mail"
import TablerUser from "~icons/tabler/user"

const ContactPage = () => {
  return (
    <>
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6">Contact</h1>
        <p class="text-on-base/70 tall-lines">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <form class="flex flex-col px-6 py-20">
        <FormField class="md:grid md:grid-cols-5 gap-x-12">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Name</FormField.Label>
          <div class="md:col-span-3 relative">
            <Input variant="outline" size="lg" class="w-full sm:max-w-xs pl-12 peer" />
            <div class="h-8 w-8 flex bg-base-300 peer-hover:bg-accent/10 peer-hover:text-accent peer-focus-visible:bg-accent/10 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
              <TablerUser class="m-auto" />
            </div>
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Email</FormField.Label>
          <div class="md:col-span-3 relative">
            <Input variant="outline" size="lg" class="w-full sm:max-w-sm pl-12 peer" />
            <div class="h-8 w-8 flex bg-base-300 peer-hover:bg-accent/10 peer-hover:text-accent peer-focus-visible:bg-accent/10 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
              <TablerMail class="m-auto" />
            </div>
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Subject</FormField.Label>
          <div class="md:col-span-3">
            <Input variant="outline" size="lg" class="w-full" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" />
        <FormField class="md:grid md:grid-cols-5 gap-x-12">
          <FormField.Label class="lg:text-base md:![line-height:2.75rem]">Message</FormField.Label>
          <div class="md:col-span-3 flex">
            <Textarea variant="outline" size="lg" class="w-full h-52" />
          </div>
        </FormField>
        <hr class="border-transparent md:border-on-base/10 my-2 md:my-6" />
        <div class="grid md:grid-cols-5 gap-x-12">
          <Button
            theme="accent"
            class="md:col-span-3 md:col-start-2 sm:w-1/2 md:w-full lg:w-1/2 sm:mx-auto md:mx-0 lg:mx-auto"
          >
            Send
          </Button>
        </div>
      </form>
    </>
  )
}

export default ContactPage

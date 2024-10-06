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
    <div class="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 px-6">
      <A href="/" class={button({ variant: "raised", shape: "circle", class: "group mr-auto" })}>
        <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
      </A>
      <div class="grow max-w-2xl -mt-1">
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-6">Contact</h1>
        <p class="text-on-base/70 tall-lines">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
        <form class="flex flex-col gap-6 py-20">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <FormField class="relative">
              <FormField.Label>Name</FormField.Label>
              <Input variant="outline" class="w-full pl-11 peer" />
              <div class="h-7 w-7 flex bg-base-300 peer-hover:bg-accent/10 peer-hover:text-accent peer-focus-visible:bg-accent/10 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
                <TablerUser class="m-auto" />
              </div>
            </FormField>
            <FormField class="relative">
              <FormField.Label>Email</FormField.Label>
              <Input variant="outline" class="w-full pl-11 peer" />
              <div class="h-7 w-7 flex bg-base-300 peer-hover:bg-accent/10 peer-hover:text-accent peer-focus-visible:bg-accent/10 peer-focus-visible:text-accent transition-colors rounded-md absolute bottom-1.5 left-1.5 pointer-events-none">
                <TablerMail class="m-auto" />
              </div>
            </FormField>
          </div>
          <FormField>
            <FormField.Label>Subject</FormField.Label>
            <Input variant="outline" class="w-full" />
          </FormField>
          <FormField>
            <FormField.Label>Message</FormField.Label>
            <Textarea variant="outline" class="w-full h-44" />
          </FormField>
          <Button variant="solid" theme="accent" class="sm:w-1/2 mt-6 sm:mx-auto">
            Send
          </Button>
        </form>
      </div>
      <div class="max-md:hidden w-10 ml-auto" />
    </div>
  )
}

export default ContactPage

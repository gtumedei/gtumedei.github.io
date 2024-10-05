import { Button } from "~/components/ui/button"

const HomePage = () => {
  return (
    <div class="h-[2000px]">
      <p>HomePage</p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, impedit? Culpa sed quae,
      totam, aliquam nihil, deserunt suscipit voluptatibus deleniti quo quia nemo provident nam. Rem
      delectus recusandae alias velit repellendus itaque expedita odio sunt ab? Sint sit debitis
      veritatis dicta nemo corrupti distinctio, neque impedit alias? Sit, pariatur dolores.
      <div class="flex flex-wrap gap-2 py-6">
        <Button theme="accent">Button</Button>
        <Button variant="outline">Button</Button>
        <Button variant="subtle">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="raised">Button</Button>
      </div>
    </div>
  )
}

export default HomePage

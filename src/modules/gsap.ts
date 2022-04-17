import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { UserModule } from "@/types"

export const install: UserModule = () => {
  gsap.registerPlugin(ScrollTrigger)
}
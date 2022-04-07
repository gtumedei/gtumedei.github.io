import { useDark, useToggle } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useDarkMode = () => ({ isDark, toggleDark })
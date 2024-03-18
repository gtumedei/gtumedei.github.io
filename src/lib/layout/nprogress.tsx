import nprogress from "nprogress"

const NProgress = () => {
  document.addEventListener("astro:before-preparation", () => nprogress.start())
  document.addEventListener("astro:page-load", () => nprogress.done())
  return <></>
}

export default NProgress

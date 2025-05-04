import { Link, Meta as SolidMeta, Title } from "@solidjs/meta"
import { useLocation } from "@solidjs/router"
import { Component, createMemo } from "solid-js"
import env from "~/lib/env"

const Meta: Component<{
  title?: string
  description: string
  image?: string
  canonicalLocation?: string
}> = (props) => {
  const location = useLocation()

  const title = createMemo(() =>
    props.title ? `${props.title} • Gianni Tumedei` : "Gianni Tumedei"
  )
  const canonicalUrl = createMemo(
    () => env.public.PUBLIC_BASE_URL + (props.canonicalLocation ?? location.pathname)
  )
  const imageUrl = createMemo(() => {
    const image = props.image ?? "/og-image.png"
    return image.startsWith("/") ? env.public.PUBLIC_BASE_URL + image : image
  })

  return (
    <>
      <Title>{title()}</Title>

      {/* Canonical URL */}
      {canonicalUrl() && <Link rel="canonical" href={canonicalUrl()!} />}

      {/* Primary Meta Tags */}
      <SolidMeta name="title" content={title()} />
      <SolidMeta name="description" content={props.description} />

      {/* Open Graph / Facebook */}
      <SolidMeta property="og:type" content="website" />
      {canonicalUrl() && <SolidMeta property="og:url" content={canonicalUrl()!} />}
      <SolidMeta property="og:title" content={title()} />
      <SolidMeta property="og:description" content={props.description} />
      <SolidMeta property="og:image" content={imageUrl()} />

      {/* Twitter */}
      <SolidMeta property="twitter:card" content="summary_large_image" />
      {canonicalUrl() && <SolidMeta property="twitter:url" content={canonicalUrl()!} />}
      <SolidMeta property="twitter:title" content={title()} />
      <SolidMeta property="twitter:description" content={props.description} />
      <SolidMeta property="twitter:image" content={imageUrl()} />
    </>
  )
}

export default Meta

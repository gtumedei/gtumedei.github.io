import { Link, Meta, Title } from "@solidjs/meta"
import { Component, createMemo } from "solid-js"
import env from "~/lib/env"

const Seo: Component<{
  title?: string
  description: string
  image?: string
  canonicalLocation?: string
}> = (props) => {
  const title = createMemo(() =>
    props.title ? `${props.title} • Gianni Tumedei` : "Gianni Tumedei"
  )
  const canonicalUrl = createMemo(() =>
    props.canonicalLocation ? env.public.PUBLIC_BASE_URL + props.canonicalLocation : null
  )
  const imageUrl = createMemo(() => {
    const image = props.image ?? "/profile.jpg"
    return image.startsWith("/") ? env.public.PUBLIC_BASE_URL + image : image
  })

  return (
    <>
      <Title>{title()}</Title>

      {/* Canonical URL */}
      {canonicalUrl() && <Link rel="canonical" href={canonicalUrl()!} />}

      {/* Primary Meta Tags */}
      <Meta name="title" content={title()} />
      <Meta name="description" content={props.description} />

      {/* Open Graph / Facebook */}
      <Meta property="og:type" content="website" />
      {canonicalUrl() && <Meta property="og:url" content={canonicalUrl()!} />}
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:image" content={imageUrl()} />

      {/* Twitter */}
      <Meta property="twitter:card" content="summary_large_image" />
      {canonicalUrl() && <Meta property="twitter:url" content={canonicalUrl()!} />}
      <Meta property="twitter:title" content={title()} />
      <Meta property="twitter:description" content={props.description} />
      <Meta property="twitter:image" content={imageUrl()} />
    </>
  )
}

export default Seo

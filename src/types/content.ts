export type ValueProposition = {
  title: string
  description: string
  accent: string
}

export type Service = {
  name: string
  description: string
  bullets: string[]
  gradient?: string
  image?: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export type HeroContent = {
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  metrics: { value: string; label: string }[]
}

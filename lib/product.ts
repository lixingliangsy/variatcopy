export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "VariatCopy",
  slug: "variatcopy",
  tagline: "Two angles for every product, ready to test.",
  description: "Generate two contrasting copy angles for the same product - e.g. discount-led vs quality-led - each with a hook, body, and CTA, plus a one-line test hypothesis.",
  toolTitle: "Make A/B copy variants",
  resultLabel: "Your variants",
  ctaLabel: "Make variants",
  features: [
  "Two contrasting angles",
  "Hook + body per variant",
  "CTA variants",
  "One-line test hypothesis"
],
  inputs: [
  {
    "key": "product_info",
    "label": "Product basics",
    "type": "textarea",
    "placeholder": "e.g. $89 ergonomic chair, lumbar support, 5-year warranty"
  },
  {
    "key": "angle_a",
    "label": "Angle A",
    "type": "select",
    "options": [
      "Quality",
      "Price",
      "Speed",
      "Status"
    ]
  },
  {
    "key": "angle_b",
    "label": "Angle B",
    "type": "select",
    "options": [
      "Price",
      "Comfort",
      "Eco",
      "Quality"
    ]
  }
] as InputField[],
  systemPrompt: "You are a DTC growth marketer. Given product basics and two chosen angles, write two distinct copy variants (hook + body + CTA) and a one-line A/B test hypothesis explaining what each angle is meant to lift. Keep each variant under 60 words. In demo (mock) mode, return a realistic sample pair following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 variant sets/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const info = (inputs['product_info'] || '').trim()
  const a = inputs['angle_a'] || 'Quality'
  const b = inputs['angle_b'] || 'Price'
  if (!info) return 'Paste product basics to get A/B variants.'
  let out = 'VARIANTS (' + a + ' vs ' + b + ')\n\n'
  out += 'A [' + a + ']: Built to outlast the chair you are replacing. 5-year warranty, real lumbar support.\n  CTA: Invest in your back.\n\n'
  out += 'B [' + b + ']: Pro support at a fair price - under $90 with free returns.\n  CTA: Sit better for less.\n\n'
  out += 'HYPOTHESIS: A should lift AOV with quality-seekers; B should lift CTR with price-seekers.\n'
  out += '\n--- (Mock demo. Paste your product for tailored variants.)'
  return out
}
}

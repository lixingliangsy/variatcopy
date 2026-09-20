export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "VariatCopy",
  slug: "variatcopy",
  productId: "PROD_0bUtBCQJIfzzIV6l4hYSFB",
  priceMonthly: 19,
  yearlyProductId: "PROD_7NMJVPuYey7lb4VyFie6AZ",
  priceYearly: 190,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_a5522925-1bff-c1df-35e7-21fbfd4a3aea",
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
  definitionLead: "VariatCopy — Two angles for every product, ready to test. Use it as decision-support: demo mode works without a live key; live runs require configuration. No fabricated metrics, and no claims for SSO/CSV/Slack unless that surface is actually shipped.",
  geoFaq: [
    { q: "What is VariatCopy?", a: "Two angles for every product, ready to test." },
    { q: "Who should use VariatCopy?", a: "Operators and builders who need a fast first draft or checklist from VariatCopy." },
    { q: "Does it work without an API key?", a: "Yes in explicit Demo mode. Live AI requires a configured key." },
    { q: "Does it guarantee outcomes?", a: "No. Outputs are decision-support; you still review before publishing or acting." },
    { q: "Does it include SSO, Slack, or bulk CSV?", a: "Only if those features are implemented in this product build — do not assume them from marketing copy." },
    { q: "Where does data go?", a: "Runs may be stored locally under the product's .data/ boundary; treat demos as ephemeral." },
  ],
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

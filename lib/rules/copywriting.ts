/**
 * lib/rules/copywriting.ts — deterministic copy-governance checklist for VariatCopy (A/B ad copy).
 *
 * Deterministic (no LLM dependency — constitution §5). Each rule carries a `ref` and the ruleset
 * carries a date-stamped RULESET_VERSION (AGENTS.md §3).
 */

export const RULESET_VERSION = '2026-07'

export interface CopyRule {
  id: string
  label: string
  category: 'honesty' | 'ftc' | 'ai-disclosure' | 'email-compliance' | 'gdpr' | 'ab-test'
  ref: string
  /** Regex tested against the copy (case-insensitive). A match means the rule is VIOLATED. */
  pattern: RegExp
  message: string
}

// References (web-research §3):
//  - FTC advertising substantiation, 15 U.S.C. §52 (false/deceptive acts): https://www.ftc.gov/legal-library/browse/rules/ftc-act-section-5-unfair-deceptive-acts-practices
//  - FTC Endorsement Guides, 16 CFR Part 255: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255
//  - FTC AI disclosures: https://www.ftc.gov/policy/advocacy-research/techact
//  - CAN-SPAM Act: https://www.ftc.gov/legal-library/browse/rules/can-spam-rule
//  - GDPR Art.6 (lawful basis for marketing): https://gdpr-info.eu/art-6/

export const RULES: CopyRule[] = [
  {
    id: 'HONESTY_NO_GUARANTEE',
    label: 'No absolute guarantees / efficacy exaggeration',
    category: 'honesty',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-act-section-5-unfair-deceptive-acts-practices',
    pattern: /\b(guarantee|guaranteed|100%\s*(success|conversion|click|roi)|never\s+(miss|fail)|always\s+works|risk[- ]free|no\s+risk)\b/i,
    message:
      'Do not promise guaranteed/100%/never-miss results. FTC §5 prohibits deceptive efficacy claims in ad copy.',
  },
  {
    id: 'HONESTY_NO_FABRICATED_RESULTS',
    label: 'No fabricated customer metrics or testimonials',
    category: 'ftc',
    ref: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255',
    pattern: /\b(\d{2,3}%\s+(of\s+(customers|users)|uplift|roi|conversion)|rated\s+by\s+\d+|“?\d+\s+(5[- ]star|star)\s+reviews”?)"/i,
    message:
      'Do not invent statistics, ratings, or testimonials. Under FTC 16 CFR 255, endorsements must reflect honest experience.',
  },
  {
    id: 'AB_HONESTY_NO_PROVEN_CLAIM',
    label: 'No "proven/scientific" A/B claim without real data',
    category: 'ab-test',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-act-section-5-unfair-deceptive-acts-practices',
    pattern: /\b(proven|scientifically\s+shown|studies\s+show|data[- ]proven|statistically\s+guaranteed)\b/i,
    message:
      'Do not claim a variant is "proven/scientific" unless you have run a real, adequately-powered A/B test. A hypothesis is not a result.',
  },
  {
    id: 'AI_DISCLOSURE',
    label: 'AI-generated ad copy must be disclosed where required',
    category: 'ai-disclosure',
    ref: 'https://www.ftc.gov/policy/advocacy-research/techact',
    pattern: /\b(real\s+customer|written\s+by\s+a\s+human\s+expert|verified\s+buyer)\b/i,
    message:
      'Do not present AI-generated variants as authentic human/verified customer content. Disclose AI assistance where the platform requires it.',
  },
  {
    id: 'CANSPAM_UNSUBSCRIBE',
    label: 'Email copy must include a clear opt-out / unsubscribe mechanism',
    category: 'email-compliance',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/can-spam-rule',
    pattern: /(^|\n).*(unsubscribe|opt[- ]out)/i,
    message:
      'CAN-SPAM requires a clear, functional unsubscribe. If this is an email variant, include an opt-out before sending.',
  },
  {
    id: 'GDPR_CONSENT',
    label: 'EU marketing needs lawful basis / consent disclosure',
    category: 'gdpr',
    ref: 'https://gdpr-info.eu/art-6/',
    pattern: /(^|\n).*(subscribe|sign\s+up|join\s+our\s+list)/i,
    message:
      'GDPR Art.6 requires a lawful basis + clear consent for EU marketing. State why you process the email and link your privacy policy.',
  },
]

export interface CopyAudit {
  honestyPassed: boolean
  flaggedRules: string[]
  flaggedTerms: string[]
  rules: CopyRule[]
}

/** Audit a piece of copy against the deterministic governance checklist. */
export function auditCopy(text: string): CopyAudit {
  const hits: { rule: CopyRule; terms: string[] }[] = []
  for (const rule of RULES) {
    const m = text.match(rule.pattern)
    if (m) {
      hits.push({ rule, terms: m.slice(0, 3).map((x) => x?.trim()).filter(Boolean) as string[] })
    }
  }
  const flaggedRules = hits.map((h) => h.rule.id)
  const flaggedTerms = Array.from(new Set(hits.flatMap((h) => h.terms)))
  const honestyPassed = !hits.some(
    (h) => h.rule.category === 'honesty' || h.rule.category === 'ftc' || h.rule.category === 'ab-test',
  )
  return { honestyPassed, flaggedRules, flaggedTerms, rules: RULES }
}

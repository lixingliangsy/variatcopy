import Head from 'next/head'

import { buildFaqJsonLd, buildHowToJsonLd } from '../lib/schema'

const faqs = [
  {
    "question": "What is VariatCopy — and when to use it",
    "answer": "VariatCopy is a tool that writes two contrasting A/B copy variants for the same product, each with a hook, body, and CTA, plus a one-line test hypothesis. Use it when you want angles to test without writing both yourself."
  },
  {
    "question": "How to make an A/B copy variant in 10 minutes",
    "answer": "A step-by-step for a first A/B copy variant using VariatCopy: paste product basics, pick two angles, then review the variants and the test hypothesis."
  },
  {
    "question": "Common A/B copy variant mistakes (and how to avoid them)",
    "answer": "5 recurring errors teams make in an A/B copy variant, with fixes: angles too similar, no clear hook, weak CTA, missing a test hypothesis, and copy that is too long to test."
  },
  {
    "question": "VariatCopy vs. doing it manually",
    "answer": "Trade-offs: speed, cost, and where human review still wins."
  }
] as { question: string; answer: string }[]

const howToBlocks = [
  {
    "name": "How to make an A/B copy variant in 10 minutes",
    "steps": [
      {
        "name": "Paste product basics",
        "text": "Enter the product basics so both copy variants stay accurate."
      },
      {
        "name": "Pick two angles",
        "text": "Choose two contrasting angles, such as quality versus price, for the variants."
      },
      {
        "name": "Review the variants",
        "text": "Review the A/B copy variants, their CTAs, and the test hypothesis."
      }
    ]
  }
] as { name: string; steps: { name: string; text: string }[] }[]

export default function Page() {
  const NAME = "VariatCopy";
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
        />
        {howToBlocks.map((block, i) => (
          <script
            key={`howto-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildHowToJsonLd(block.name, block.steps)),
            }}
          />
        ))}

        <title>{NAME} — Blog</title>
        <meta name="description" content={NAME + " — Definitional and how-to posts."} />
      </Head>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-slate-900">{NAME}</a>
            <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-500">
              <a href="/use-cases" className="hover:text-slate-900">Use cases</a>
              <a href="/integrations" className="hover:text-slate-900">Integrations</a>
              <a href="/how-it-works" className="hover:text-slate-900">How it works</a>
              <a href="/security" className="hover:text-slate-900">Security</a>
              <a href="/blog" className="hover:text-slate-900">Blog</a>
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
          <p className="mt-3 text-slate-600">Definitional and how-to posts that help search engines and humans understand VariatCopy.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">What is VariatCopy — and when to use it</h3>
            <p className="mt-2 text-sm text-slate-600">VariatCopy is a tool that writes two contrasting A/B copy variants for the same product, each with a hook, body, and CTA, plus a one-line test hypothesis. Use it when you want angles to test without writing both yourself.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">How to make an A/B copy variant in 10 minutes</h3>
            <p className="mt-2 text-sm text-slate-600">A step-by-step for a first A/B copy variant using VariatCopy: paste product basics, pick two angles, then review the variants and the test hypothesis.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Common A/B copy variant mistakes (and how to avoid them)</h3>
            <p className="mt-2 text-sm text-slate-600">5 recurring errors teams make in an A/B copy variant, with fixes: angles too similar, no clear hook, weak CTA, missing a test hypothesis, and copy that is too long to test.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">VariatCopy vs. doing it manually</h3>
            <p className="mt-2 text-sm text-slate-600">Trade-offs: speed, cost, and where human review still wins.</p>
          </article>
          </div>
        </main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-slate-500 flex flex-wrap gap-6">
            <a href="/security" className="hover:text-slate-900">Security</a>
            <a href="/use-cases" className="hover:text-slate-900">Use cases</a>
            <a href="/integrations" className="hover:text-slate-900">Integrations</a>
            <a href="/how-it-works" className="hover:text-slate-900">How it works</a>
            <a href="/blog" className="hover:text-slate-900">Blog</a>
          </div>
        </footer>
      </div>
    </>
  )
}

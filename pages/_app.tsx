import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VariatCopy" />
        <meta property="og:description" content="Generate two contrasting copy angles for the same product - e.g. discount-led vs quality-led - each with a hook, body, and CTA, plus a one-line test hypothesis." />
        <meta property="og:url" content="https://variatcopy.lxsaihub.com/" />
        <meta property="og:image" content="https://variatcopy.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VariatCopy" />
        <meta name="twitter:description" content="Generate two contrasting copy angles for the same product - e.g. discount-led vs quality-led - each with a hook, body, and CTA, plus a one-line test hypothesis." />
        <meta name="twitter:image" content="https://variatcopy.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"VariatCopy","url":"https://variatcopy.lxsaihub.com/","description":"Generate two contrasting copy angles for the same product - e.g. discount-led vs quality-led - each with a hook, body, and CTA, plus a one-line test hypothesis.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}

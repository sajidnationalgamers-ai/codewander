import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for CodeWander - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'March 30, 2026';

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Welcome to CodeWander (<strong>codewander.vercel.app</strong>). We are committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, and safeguard your information
              when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              2. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Log Data:</strong> When you visit our site, we automatically collect information such as your IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies:</strong> We use cookies to improve your browsing experience and to serve relevant advertisements.</li>
              <li><strong>Usage Data:</strong> We collect anonymous data about how you interact with our content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              3. Google AdSense & Advertising
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              We use Google AdSense to display advertisements on our website. Google AdSense may use cookies
              and web beacons to collect data in order to show you personalized ads based on your visits to
              this and other websites.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your
              visit to our site. You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads"
                className="text-brand-500 hover:text-brand-600 underline"
                target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              4. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>To improve and optimize our website content</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To ensure the security and proper functioning of our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              5. Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small files stored on your device. We use cookies to remember your preferences
              (such as dark/light mode) and to enable advertising features. You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent. However, some features of
              our website may not function properly without cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              6. Third-Party Links
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              7. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We take reasonable measures to protect your information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              8. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our website is not directed to children under the age of 13. We do not knowingly
              collect personal information from children. If you believe we have collected information
              from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              9. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              10. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please visit our{' '}
              <a href="/about" className="text-brand-500 hover:text-brand-600 underline">
                About page
              </a>{' '}
              for more information about CodeWander.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
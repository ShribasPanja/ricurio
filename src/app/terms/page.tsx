import Image from "next/image";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Image
                src="/logo.png"
                alt="Recurio Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Recurio</span>
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: December 11, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Recurio, you accept and agree to be bound
              by these Terms of Service. If you do not agree to these terms,
              please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-4">
              Recurio is a Chrome extension that helps you manage LinkedIn
              connections by allowing you to import profile information and sync
              it with Google Sheets. The service is provided "as is" and we
              reserve the right to modify or discontinue the service at any
              time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                Use the service in compliance with all applicable laws and
                regulations
              </li>
              <li>
                Respect LinkedIn's Terms of Service and robots.txt directives
              </li>
              <li>
                Not use the service for spam, harassment, or any malicious
                purposes
              </li>
              <li>
                Not attempt to reverse engineer, decompile, or hack the
                extension
              </li>
              <li>
                Not use automated tools to scrape data beyond reasonable
                personal use
              </li>
              <li>
                Be responsible for maintaining the security of your Google
                account
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. LinkedIn Terms Compliance
            </h2>
            <p className="text-gray-700 mb-4">
              Recurio is not affiliated with, endorsed by, or sponsored by
              LinkedIn. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>You are solely responsible for your use of LinkedIn</li>
              <li>You must comply with LinkedIn's Terms of Service</li>
              <li>
                LinkedIn may restrict or terminate your account for automated
                scraping
              </li>
              <li>
                We are not liable for any consequences resulting from LinkedIn's
                actions
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Subscription and Payment
            </h2>
            <p className="text-gray-700 mb-4">
              Recurio offers both free and paid subscription tiers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Free Tier:</strong> Limited features with restrictions
                on daily imports
              </li>
              <li>
                <strong>Pro Tier:</strong> Monthly or annual subscription with
                unlimited access
              </li>
              <li>
                Subscriptions are billed in advance and automatically renew
                unless cancelled
              </li>
              <li>
                Refunds are handled on a case-by-case basis within 14 days of
                purchase
              </li>
              <li>
                We reserve the right to change pricing with 30 days notice to
                existing subscribers
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Ownership and Usage
            </h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of all data you import and create using
              Recurio. However:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                You grant us permission to process your data to provide the
                service
              </li>
              <li>
                Data synced to Google Sheets is governed by Google's terms
              </li>
              <li>
                We may use aggregated, anonymized data for analytics and
                improvements
              </li>
              <li>You are responsible for backing up your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Prohibited Uses
            </h2>
            <p className="text-gray-700 mb-4">You may not use Recurio to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Send spam or unsolicited messages</li>
              <li>Collect data for sale or distribution to third parties</li>
              <li>Harass, abuse, or harm others</li>
              <li>Circumvent rate limits or usage restrictions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                We are not liable for any data loss, corruption, or unauthorized
                access
              </li>
              <li>
                We are not responsible for LinkedIn account restrictions or
                terminations
              </li>
              <li>
                The service is provided "as is" without warranties of any kind
              </li>
              <li>
                Our total liability shall not exceed the amount paid by you in
                the last 12 months
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your access to
              Recurio at any time for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Violation of these terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Abusive behavior or harassment</li>
              <li>Non-payment of subscription fees</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by uninstalling the
              extension.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We may update these terms from time to time. Continued use of the
              service after changes constitutes acceptance of the new terms.
              Material changes will be communicated via the extension or email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Governing Law
            </h2>
            <p className="text-gray-700 mb-4">
              These terms shall be governed by and construed in accordance with
              applicable laws. Any disputes shall be resolved through binding
              arbitration or in courts of competent jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about these terms, please contact us at:{" "}
              <a
                href="mailto:shribaspanja@gmail.com"
                className="text-blue-600 hover:underline"
              >
                shribaspanja@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Severability
            </h2>
            <p className="text-gray-700 mb-4">
              If any provision of these terms is found to be unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2025 Recurio. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-gray-900 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

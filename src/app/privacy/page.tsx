import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: December 11, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to Recurio. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we handle your personal data when you use our Chrome
              extension and related services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Data We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect and process the following types of data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                <strong>LinkedIn Profile Information:</strong> Names, job
                titles, companies, and other publicly available information from
                LinkedIn profiles you choose to import.
              </li>
              <li>
                <strong>Google Account Information:</strong> Email address and
                basic profile information when you connect Google Sheets.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                extension, including features accessed and interactions.
              </li>
              <li>
                <strong>Local Storage:</strong> Data stored locally in your
                browser for extension functionality.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-700 mb-4">
              We use your data for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>To provide and maintain our service</li>
              <li>To sync your LinkedIn contacts with Google Sheets</li>
              <li>To manage and organize your CRM data</li>
              <li>To improve our extension and user experience</li>
              <li>To communicate with you about updates and support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Data Storage and Security
            </h2>
            <p className="text-gray-700 mb-4">
              Your data is primarily stored locally in your browser using
              Chrome's storage API. When you choose to sync with Google Sheets,
              data is transmitted directly to your Google account. We implement
              appropriate security measures to protect your data from
              unauthorized access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-gray-700 mb-4">
              We integrate with the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Google Sheets:</strong> For data synchronization and
                storage. Google's privacy policy applies to data stored in
                Google Sheets.
              </li>
              <li>
                <strong>LinkedIn:</strong> We scrape publicly available
                information from LinkedIn profiles you visit. LinkedIn's terms
                of service apply.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data at any time</li>
              <li>Export your data</li>
              <li>Opt-out of data collection by uninstalling the extension</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-700 mb-4">
              We retain your data only as long as necessary to provide our
              services. You can delete your data at any time through the
              extension settings or by uninstalling the extension.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-4">
              Our service is not intended for users under the age of 18. We do
              not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this privacy policy, please
              contact us at:{" "}
              <a
                href="mailto:shribaspanja@gmail.com"
                className="text-blue-600 hover:underline"
              >
                shribaspanja@gmail.com
              </a>
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

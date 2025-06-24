import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <div className="mt-4 inline-flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              Last updated: June 24, 2025
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Quick Navigation */}
          <div className="border-b border-gray-100 bg-gray-50/80">
            <div className="px-6 py-4">
              <nav className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {["Information Collection", "Data Usage", "Security", "Your Rights", "Contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => document.getElementById(section.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" })}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap
                             transition-colors duration-200 rounded-lg hover:bg-blue-50"
                  >
                    {section}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-blue max-w-none">
              <section id="information-collection" className="scroll-mt-24">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mt-0">Information We Collect</h2>
                    <p className="text-gray-600">We collect information that you provide directly to us, including:</p>
                    <ul className="space-y-2 mt-4">
                      {[
                        "Personal identification information",
                        "Health-related information for appointments",
                        "Payment information",
                        "Communication preferences"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRightIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="data-usage" className="mt-12 scroll-mt-24">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7M3 7l9 7 9-7M3 11h18" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mt-0">How We Use Your Information</h2>
                    <p className="text-gray-600">We use the information we collect to:</p>
                    <ul className="space-y-2 mt-4">
                      {[
                        "Process and manage your appointments",
                        "Facilitate communication between you and healthcare providers",
                        "Process payments",
                        "Send appointment reminders and updates",
                        "Improve our services"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRightIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="security" className="mt-12 scroll-mt-24">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a2 2 0 00-2 2v2a2 2 0 004 0V4a2 2 0 00-2-2zm0 18a2 2 0 002-2v-2a2 2 0 00-4 0v2a2 2 0 002 2zm8-10a2 2 0 00-2-2h-2a2 2 0 000 4h2a2 2 0 002-2zm-18 0a2 2 0 002-2H4a2 2 0 000 4h2a2 2 0 002-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mt-0">Data Security</h2>
                    <p className="text-gray-600">
                      We implement appropriate technical and organizational security measures to
                      protect your personal information. However, no method of transmission over
                      the Internet is 100% secure.
                    </p>
                  </div>
                </div>
              </section>

              <section id="your-rights" className="mt-12 scroll-mt-24">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mt-0">Your Rights</h2>
                    <p className="text-gray-600">You have the right to:</p>
                    <ul className="space-y-2 mt-4">
                      {[
                        "Access your personal information",
                        "Correct inaccurate information",
                        "Request deletion of your information",
                        "Opt-out of marketing communications"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRightIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="contact" className="mt-12 scroll-mt-24">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mt-0">Need Help?</h2>
                  <p className="text-gray-600 mt-2">
                    If you have questions about this Privacy Policy, we're here to help.
                    Contact us at{" "}
                    <a
                      href="mailto:pphananhthai.dao04@gmail.com"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        phananhthai.dao04@gmail.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                By using DABS, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </Link>
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg
                         border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

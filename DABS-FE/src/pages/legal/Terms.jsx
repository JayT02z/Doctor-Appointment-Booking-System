import React from "react";
import { Link } from "react-router-dom";
import { DocumentTextIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Terms = () => {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      ),
      content: "By accessing and using DABS (Doctor Appointment Booking System), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service."
    },
    {
      id: "use-of-service",
      title: "2. Use of Service",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      ),
      items: [
        "Provide accurate and complete information when creating an account",
        "Maintain the security of your account credentials",
        "Not use the service for any unlawful purpose",
        "Not interfere with the proper working of the service"
      ]
    },
    {
      id: "appointments",
      title: "3. Appointment Booking",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
      ),
      items: [
        "Attend scheduled appointments or cancel within the specified cancellation period",
        "Understand that late cancellations may incur fees",
        "Provide accurate medical information as required"
      ]
    },
    {
      id: "payments",
      title: "4. Payment Terms",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" />
      ),
      items: [
        "Pay all fees associated with your appointments",
        "Authorize us to charge your chosen payment method",
        "Understand that some services may require advance payment",
        "Refunds are subject to our cancellation policy"
      ]
    },
    {
      id: "healthcare",
      title: "5. Healthcare Provider Relationship",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      ),
      content: "DABS is a platform that facilitates connections between patients and healthcare providers. We do not provide medical advice or treatment, guarantee the quality of healthcare services, or accept responsibility for healthcare providers' actions."
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
      ),
      content: "DABS is not liable for medical outcomes or advice provided by healthcare providers, service interruptions or technical issues, loss of data or unauthorized access, or indirect, consequential, or incidental damages."
    },
    {
      id: "modifications",
      title: "7. Modifications to Service",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      ),
      content: "We reserve the right to modify or discontinue any part of the service, update these terms at any time, and change our fees and payment policies."
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
      ),
      content: "These terms are governed by the laws of Vietnam. Any disputes shall be resolved in the courts of Ho Chi Minh City, Vietnam."
    },
    {
      id: "contact",
      title: "9. Contact Information",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
      ),
      content: "For questions about these Terms of Service, please contact us at legal@dabs.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
            <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
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
                {[
                  "Acceptance",
                  "Use of Service",
                  "Appointments",
                  "Payments",
                  "Healthcare",
                  "Liability",
                  "Contact"
                ].map((section) => (
                  <button
                    key={section}
                    onClick={() => document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 whitespace-nowrap
                             transition-colors duration-200 rounded-lg hover:bg-indigo-50"
                  >
                    {section}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-indigo max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-indigo-50">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {section.icon}
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mt-0">{section.title}</h2>
                      <p className="text-gray-600">{section.content}</p>
                      {section.items && (
                        <ul className="space-y-2 mt-4">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRightIcon className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              ))}

              {/* Contact Section */}
              <section id="contact" className="mt-12 scroll-mt-24">
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mt-0">Questions About Our Terms?</h2>
                  <p className="text-gray-600 mt-2">
                    If you have any questions about these Terms of Service, please contact our legal team at{" "}
                    <a
                      href="mailto:phananhthai.dao04@gmail.com"
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
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
                Please also review our{" "}
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Privacy Policy
                </Link>
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg
                         border border-gray-200 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
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

export default Terms;

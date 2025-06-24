import React, { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-blue-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <MapPinIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Visit Us</h3>
              <p className="mt-1 text-sm text-gray-500">
                123 Health Street<br />
                Ho Chi Minh City, Vietnam
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <PhoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Call Us</h3>
              <p className="mt-1 text-sm text-gray-500">
                <a href="tel:1900 2115" className="hover:text-blue-600">
                  1900 2115
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <EnvelopeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Us</h3>
              <p className="mt-1 text-sm text-gray-500">
                <a href="mailto:phananhthai.dao04@gmail.com" className="hover:text-blue-600">
                    phananhthai.dao04@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Working Hours</h3>
              <p className="mt-1 text-sm text-gray-500">
                Mon - Fri: 8:00 - 18:00<br />
                Sat: 8:00 - 14:00
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg
                         text-base font-medium text-white bg-blue-600 hover:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition-colors duration-200"
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-sm p-8 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
            <div className="rounded-lg overflow-hidden h-[400px] bg-gray-100">
              <iframe
                title="DABS Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674797967!2d106.69158015012591!3d10.779716992283388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1bb3%3A0xc2a631e570308750!2sHo%20Chi%20Minh%20City%20Medicine%20and%20Pharmacy%20University!5e0!3m2!1sen!2s!4v1656058888888!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
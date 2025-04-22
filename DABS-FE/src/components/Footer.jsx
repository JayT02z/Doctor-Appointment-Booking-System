import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About DABS</h3>
            <p className="text-gray-600">
              Doctor Appointment Booking System - Making healthcare accessible
              and convenient for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Online Booking</li>
              <li className="text-gray-600">Doctor Search</li>
              <li className="text-gray-600">Appointment Management</li>
              <li className="text-gray-600">Medical Records</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: support@dabs.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600">
                Address: 123 Medical St, Health City
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} DABS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

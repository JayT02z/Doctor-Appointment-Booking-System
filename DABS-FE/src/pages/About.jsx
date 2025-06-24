import React from "react";
import {
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const About = () => {
  const values = [
    {
      icon: HeartIcon,
      title: "Patient-Centric Care",
      description: "We put our patients first, ensuring personalized care and attention to individual needs."
    },
    {
      icon: ShieldCheckIcon,
      title: "Trust & Security",
      description: "Your health information is protected with state-of-the-art security measures."
    },
    {
      icon: ClockIcon,
      title: "Accessibility",
      description: "Easy access to healthcare services when you need them, wherever you are."
    },
    {
      icon: StarIcon,
      title: "Excellence",
      description: "Commitment to maintaining the highest standards in healthcare service delivery."
    }
  ];

  const stats = [
    { number: "50k+", label: "Patients Served" },
    { number: "200+", label: "Expert Doctors" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Cardiology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Pediatrics",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About DABS</h1>
            <p className="text-xl text-blue-100">
              Revolutionizing healthcare access through technology, making quality medical care available to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-12 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At DABS, we're on a mission to transform healthcare delivery through innovative technology.
            We believe that quality healthcare should be accessible, efficient, and patient-focused.
            Our platform connects patients with trusted healthcare providers, making the booking process
            seamless and stress-free.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have chosen DABS for their healthcare needs.
          </p>
          <button className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors duration-200">
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
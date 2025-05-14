import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our Platform</h1>

            <div className="bg-white shadow-md rounded-lg p-8">
                <p className="text-gray-700 mb-4">
                    Welcome to the Doctor Appointment Booking System (DABS)! We are dedicated to
                    revolutionizing the way patients connect with healthcare providers. Our
                    platform offers a seamless and efficient way to find the right doctor,
                    book appointments online, and manage your healthcare needs.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                    Our mission is to improve access to quality healthcare by providing a user-friendly
                    and reliable platform that simplifies the appointment booking process. We strive
                    to empower patients with the tools and information they need to make informed
                    decisions about their health.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>
                        <b>Easy Appointment Booking:</b>  Quickly schedule appointments with doctors
                        online.
                    </li>
                    <li>
                        <b>Wide Network of Doctors:</b>  Choose from a diverse range of specialists
                        and general practitioners.
                    </li>
                    <li>
                        <b>Appointment Management:</b>  Reschedule, cancel, and track your appointments
                        effortlessly.
                    </li>
                    <li>
                        <b>Secure and Reliable:</b>  Your data and privacy are our top priorities.
                    </li>

                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
                <p className="text-gray-700 mb-4">
                    DABS is built by a team of passionate individuals committed to making a
                    difference in healthcare.  We combine expertise in technology and healthcare
                    to deliver a solution that meets the needs of both patients and doctors.
                </p>

                <p className="text-gray-700">
                    Thank you for choosing DABS. We are here to support your health journey.
                </p>
            </div>
        </div>
    );
};

export default About;
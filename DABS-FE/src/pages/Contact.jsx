import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>

            <div className="bg-white shadow-md rounded-lg p-8">
                <p className="text-gray-700 mb-4">
                    We'd love to hear from you! If you have any questions, feedback, or
                    inquiries, please feel free to reach out to us using the information
                    below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-gray-700 mb-2">
                            <b>Email:</b>  <a href="mailto:support@dabs.com">support@dabs.com</a>
                        </p>
                        <p className="text-gray-700 mb-2">
                            <b>Phone:</b>  +1 (555) 123-4567
                        </p>
                        <p className="text-gray-700 mb-2">
                            <b>Address:</b>
                            <br />
                            123 Health Street
                            <br />
                            Cityville, State 12345
                            <br />
                            USA
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Send us a Message
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
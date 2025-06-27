import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Facebook } from "lucide-react";

const SupportSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-gradient-to-r from-[#00B5F1] to-[#0090c1] rounded-3xl p-8
                     flex flex-col md:flex-row items-center justify-between gap-8
                     shadow-[0_20px_50px_rgba(0,181,241,0.3)] relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/3 flex justify-center relative"
            >
                <img
                    src="https://t3.ftcdn.net/jpg/04/96/80/34/360_F_496803433_TeCu85tBSH36XkKklQ4Eu6Zc5EbZQgs5.jpg"
                    alt="Doctor with tablet"
                    className="max-h-56 object-contain rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full md:w-1/3 text-center text-white space-y-4 relative"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl
                                flex items-center justify-center text-white border border-white/20
                                shadow-[0_8px_16px_rgba(0,0,0,0.1)] transform hover:scale-105 transition-transform"
                    >
                        <PhoneCall size={28} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white/90">CÁC HÌNH THỨC HỖ TRỢ</h3>
                        <div className="relative">
                            <p className="text-4xl font-bold tracking-wider text-white">
                                1900-2115
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full md:w-1/3 flex items-center justify-center gap-6 relative"
            >
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3
                             shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <div className="relative">
                        <img
                            src="/qrzl.png"
                            alt="Zalo QR Code"
                            className="w-24 h-24 rounded-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00B5F1] rounded-full
                                    flex items-center justify-center shadow-lg"
                        >
                            <MessageCircle size={14} className="text-white" />
                        </div>
                    </div>
                    <span className="font-medium text-gray-700">Zalo</span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3
                             shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <div className="relative">
                        <img
                            src="/qrfb.png"
                            alt="Facebook QR Code"
                            className="w-24 h-24 rounded-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00B5F1] rounded-full
                                    flex items-center justify-center shadow-lg"
                        >
                            <Facebook size={14} className="text-white" />
                        </div>
                    </div>
                    <span className="font-medium text-gray-700">Facebook</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SupportSection;

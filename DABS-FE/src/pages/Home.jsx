import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import HeroBanner from "../components/home/HeroBanner.jsx";
import StatsSection from "../components/home/StatsSection.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import FeaturedServices from "../components/home/FeaturedServices.jsx";
import FeaturedDoctors from "../components/home/FeaturedDoctors.jsx";
import PatientTestimonials from "../components/home/PatientTestimonials.jsx";
import LatestArticles from "../components/home/LatestArticles.jsx";
import CTASection from "../components/home/CTASection.jsx";
import WelcomeBack from "../components/home/WelcomeBack.jsx";
import SupportSection from "../components/home/SupportSection.jsx";
import ChatWidget from "../components/ChatWidget.jsx";
import ChatWithAdmin from "../components/ChatWithAdmin.jsx";

const Home = () => {
    const { user, patientId } = useAuth();
    const [showProfileAlert, setShowProfileAlert] = useState(false);

    useEffect(() => {
        if (user?.role === "PATIENT" && !patientId) {
            setShowProfileAlert(true);
        }
    }, [user, patientId]);

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] xl:aspect-[32/9]">
                <HeroBanner />
            </div>
            <StatsSection />
            <WhyChooseUs />
            <FeaturedServices />
            <FeaturedDoctors />
            <PatientTestimonials />
            <LatestArticles />
            <SupportSection/>
            <ChatWithAdmin/>
            <ChatWidget />
        </div>
    );
};

export default Home;
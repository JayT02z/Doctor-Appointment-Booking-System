import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";
import StatsSection from "../components/StatsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedServices from "../components/FeaturedServices";
import FeaturedDoctors from "../components/FeaturedDoctors";
import PatientTestimonials from "../components/PatientTestimonials";
import LatestArticles from "../components/LatestArticles";
import CTASection from "../components/CTASection";
import WelcomeBack from "../components/WelcomeBack";
import ChatWidget from "../components/ChatWidget.jsx";

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
            <CTASection />
            {user && (
                <WelcomeBack
                    username={user.username}
                    showProfileAlert={showProfileAlert}
                    onCloseAlert={() => setShowProfileAlert(false)}
                />
            )}
            <ChatWidget />
        </div>
    );
};

export default Home;
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWithAdmin from "./ChatWithAdmin";
import ChatWidget from "./ChatWidget";
import AdminSidebar from "./AdminSidebar";

const MainLayout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 pt-16 flex">
                {isAdminRoute && <AdminSidebar />}

                {/* Scrollable main area */}
                <div className={`flex-1 overflow-y-auto ${isAdminRoute ? 'ml-64' : ''}`}>
                    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
                        <main className="flex-1">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>

            {user?.role === "PATIENT" && (
                <>
                    <ChatWithAdmin />
                    <ChatWidget />
                </>
            )}
        </div>
    );
};

export default MainLayout;
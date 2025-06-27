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
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16"> {/* Add padding-top to account for fixed header */}
        <main className={`flex-1 ${isAdminRoute ? 'ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
      {isAdminRoute && <AdminSidebar />}
      {user?.role === "PATIENT" && (
        <>
          <ChatWithAdmin />
          <ChatWidget />
        </>
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;

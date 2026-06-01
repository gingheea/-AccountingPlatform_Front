import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";

import HomePage from "./pages/public/HomePage";
import ServicesPage from "./pages/public/ServicesPage";
import AboutMePage from "./pages/public/AboutPage.jsx";
import BlogPage from "./pages/public/BlogPage";
import PrivacyPage from "./pages/public/PrivacyPage.jsx";
import TermsPage from "./pages/public/TermsPage.jsx";
import CookiesPage from "./pages/public/CookiesPage.jsx";

import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ServicesAdminPage from "./pages/admin/ServicesAdminPage";
import PricingPackagesAdminPage from "./pages/admin/PricingPackagesAdminPage";
import RequestsAdminPage from "./pages/admin/RequestsAdminPage";

import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Toaster position="top-right" />

                <Routes>
                    {/* Публічний сайт */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/about" element={<AboutMePage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/cookies" element={<CookiesPage />} />
                    </Route>

                    {/* Логін без layout */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Адмінка — захищена */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/admin" element={<DashboardPage />} />
                        <Route path="/admin/services" element={<ServicesAdminPage />} />
                        <Route path="/admin/pricing-packages" element={<PricingPackagesAdminPage />} />
                        <Route path="/admin/requests" element={<RequestsAdminPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
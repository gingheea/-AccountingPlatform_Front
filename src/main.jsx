import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollManager from "./components/layout/ScrollManager";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout.jsx";

import HomePage from "./pages/public/HomePage";
import ServicesPage from "./pages/public/ServicesPage";
import AboutMePage from "./pages/public/AboutPage.jsx";
import BlogPage from "./pages/public/BlogPage";
import TestimonialsPage from "./pages/public/TestimonialsPage";
import PrivacyPage from "./pages/public/PrivacyPage.jsx";
import TermsPage from "./pages/public/TermsPage.jsx";
import CookiesPage from "./pages/public/CookiesPage.jsx";

import LoginPage from "./pages/admin/LoginPage";
import ForgotPasswordPage from "./pages/public/ForgotPasswordPage";
import ResetPasswordPage from "./pages/public/ResetPasswordPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ServicesAdminPage from "./pages/admin/ServicesAdminPage";
import PricingPackagesAdminPage from "./pages/admin/PricingPackagesAdminPage";
import RequestsAdminPage from "./pages/admin/RequestsAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import DocumentsAdminPage from "./pages/admin/DocumentsAdminPage";
import SubscriptionsAdminPage from "./pages/admin/SubscriptionsAdminPage";
import TestimonialsAdminPage from "./pages/admin/TestimonialsAdminPage";
import ChecklistTemplatesAdminPage from "./pages/admin/ChecklistTemplatesAdminPage";
import ReportingPeriodsAdminPage from "./pages/admin/ReportingPeriodsAdminPage";

import PortalLayout from "./components/layout/PortalLayout.jsx";
import PortalDashboardPage from "./pages/portal/PortalDashboardPage";
import PortalRequestsPage from "./pages/portal/PortalRequestsPage";
import PortalServicesPage from "./pages/portal/PortalServicesPage";
import PortalDocumentsPage from "./pages/portal/PortalDocumentsPage";
import PortalProfilePage from "./pages/portal/PortalProfilePage";
import PortalTestimonialPage from "./pages/portal/PortalTestimonialPage";
import PortalPeriodsPage from "./pages/portal/PortalPeriodsPage";

import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                {/* Manages scrolling on navigation. Every section needs it,
                    so it lives here rather than in one particular layout. */}
                <ScrollManager />

                <Toaster position="top-right" />

                <Routes>
                    {/* Public site */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/about" element={<AboutMePage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/testimonials" element={<TestimonialsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/cookies" element={<CookiesPage />} />
                    </Route>

                    {/* Login, outside any layout */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* Admin: role Admin only; a client is bounced to their own area */}
                    <Route
                        element={
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/admin" element={<DashboardPage />} />
                        <Route path="/admin/services" element={<ServicesAdminPage />} />
                        <Route path="/admin/pricing-packages" element={<PricingPackagesAdminPage />} />
                        <Route path="/admin/requests" element={<RequestsAdminPage />}/>
                        <Route path="/admin/users" element={<UsersAdminPage />} />
                        <Route path="/admin/documents" element={<DocumentsAdminPage />} />
                        <Route path="/admin/subscriptions" element={<SubscriptionsAdminPage />} />
                        <Route path="/admin/testimonials" element={<TestimonialsAdminPage />} />
                        <Route path="/admin/checklist-templates" element={<ChecklistTemplatesAdminPage />} />
                        <Route path="/admin/reporting-periods" element={<ReportingPeriodsAdminPage />} />
                    </Route>

                    {/* Portal */}
                    <Route
                        path="/portal"
                        element={
                            <ProtectedRoute>
                                <PortalLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<PortalDashboardPage />} />
                        <Route path="services" element={<PortalServicesPage />} />
                        <Route path="requests" element={<PortalRequestsPage />} />
                        <Route path="documents" element={<PortalDocumentsPage />} />
                        <Route path="periods" element={<PortalPeriodsPage />} />
                        <Route path="testimonial" element={<PortalTestimonialPage />} />
                        <Route path="profile" element={<PortalProfilePage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
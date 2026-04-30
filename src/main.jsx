import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './components/layout/PublicLayout'
import AdminLayout from './components/layout/AdminLayout'

import HomePage from './pages/public/HomePage'
import ServicesPage from './pages/public/ServicesPage'
import AboutMePage from './pages/public/AboutMePage.jsx'
import BlogPage from './pages/public/BlogPage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import ServicesAdminPage from './pages/admin/ServicesAdminPage'

import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-right" />
                <Routes>

                    {/* Публічний сайт */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/about" element={<AboutMePage />} />
                        <Route path="/blog" element={<BlogPage />} />
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
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
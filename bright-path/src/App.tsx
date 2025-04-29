import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import {
  AboutPage,
  AIAssistantPage,
  ContactPage,
  DestinationsPage,
  FAQPage,
  HomePage,
  ServicesPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  CookiePolicyPage,
  AdminHomePage,
  AdminDestinationsPage,
  AdminUsersPage,
  DestinationDetailPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="destinations" element={<AdminDestinationsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
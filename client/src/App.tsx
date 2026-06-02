import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/features/home/Home";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import Dashboard from "@/features/dashboard/Dashboard";
import NotFound from "@/features/not-found/NotFound";
import GarageDashboard from "@/features/garage/GarageDashboard";
import CreateGarage from "@/features/garage/CreateGarage";
import ManageEmployees from "@/features/garage/ManageEmployees";
import ServiceCompleted from "@/features/booking/ServiceCompleted";
import Booking from "@/features/booking/Booking";
import ApprovalPage from "@/features/booking/ApprovalPage";
import StartServicePage from "@/features/booking/StartServicePage";
import ServicePage from "@/features/booking/ServicePage";
import PaymentPage from "@/features/booking/PaymentPage";
import MechanicWorkPage from "@/features/garage/MechanicWorkPage";
import MyBookings from "@/features/garage/MyBookings";
import ScanPage from "@/features/garage/ScanPage";
import "leaflet/dist/leaflet.css";
// import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Review from "@/features/booking/Review";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>

{/* // USER
<Route path="/review/:bookingId" element={
  <ProtectedRoute allowedRoles={["USER"]}>
    <Review />
  </ProtectedRoute>
} />

<Route path="/dashboard" element={
  <ProtectedRoute allowedRoles={["USER"]}>
    <Dashboard />
  </ProtectedRoute>
} />

// GARAGE OWNER
<Route path="/garage-dashboard" element={
  <ProtectedRoute allowedRoles={["GARAGE_OWNER"]}>
    <GarageDashboard />
  </ProtectedRoute>
} /> */}
            {/* PUBLIC */}
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
        
            {/* USER DASHBOARD & BOOKING */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/garages" element={<Booking />} />
            <Route path="/service/:bookingId" element={<ServicePage />} />
            <Route path="/approval/:bookingId" element={<ApprovalPage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/review/:bookingId" element={<Review />} />
            <Route path="/complete/:bookingId" element={<ServiceCompleted />} />
            <Route path="/start-service/:bookingId" element={<StartServicePage />} />

            {/* GARAGE OWNER */}
            <Route path="/garage-dashboard" element={<GarageDashboard />} />
            <Route path="/create-garage" element={<CreateGarage />} />
            <Route path="/garage-bookings" element={<MyBookings />} />
            <Route path="/garage-employee" element={<ManageEmployees />} />
            <Route path="/scan/:bookingId" element={<ScanPage />} />
            <Route path="/mechanic/:bookingId" element={<MechanicWorkPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import GarageDashboard from "./pages/garage/GarageDashboard";
import CreateGarage from "./pages/garage/CreateGarage";
import ManageEmployees from "./pages/garage/ManageEmployees";
import CompletePage from "./pages/servicecompleted";
import Booking from "./pages/user/Booking";
import ApprovalPage from "./pages/user/aprovepage";
import StartServicePage from "./pages/user/StartServicePage";
import ServicePage from "./pages/user/ServicePage";
import PaymentPage from "./pages/user/PaymentPage";
import MechanicWorkPage from "./pages/garage/MechanicWorkPage";
import MyBookings from "./pages/garage/MyBookings";
import ScanPage from "./pages/garage/ScanPage";
import "leaflet/dist/leaflet.css";
// import ProtectedRoute from "./components/security/ProtectedRoute.";
import Review from "./pages/user/Review";

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
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>}/>

        
            <Route path="/dashboard" element={ <Dashboard />} />
            <Route path="/start-service/:bookingId" element={<StartServicePage />} />
            <Route path="/service/:bookingId" element={<ServicePage />} />
            <Route path="/approval/:bookingId" element={<ApprovalPage />} />
            <Route path="/complete/:bookingId" element={<CompletePage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/review/:bookingId" element={<PaymentPage />} />

           
            <Route path="/scan/:bookingId" element={<ScanPage />} />
            <Route path="/garages" element={<Booking/>}/>
            <Route path="/garage-bookings" element={<MyBookings/>}/>
            <Route path="/garage-employee" element={<ManageEmployees/>}/>
            <Route path="/mechanic/:bookingId" element={<MechanicWorkPage />} />
            <Route path="/create-garage" element={ <CreateGarage/>} />
            <Route path="/garage-dashboard" element={<GarageDashboard/>}/>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

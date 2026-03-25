import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Home } from "lucide-react";
import GarageDashboard from "./pages/garage/GarageDashboard";
import CreateGarage from "./pages/garage/CreateGarage";
import ManageEmployees from "./pages/garage/ManageEmployees";
import Booking from "./pages/user/Booking";
import MyBookings from "./pages/garage/MyBookings";
import "leaflet/dist/leaflet.css";

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
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={ <Dashboard />} />
            <Route path="/create-garage" element={ <CreateGarage/>} />
            <Route path="/garage-dashboard" element={<GarageDashboard/>}/>
            <Route path="/garages" element={<Booking/>}/>
            <Route path="/garage-employee" element={<ManageEmployees/>}/>
            <Route path="/garage-bookings" element={<MyBookings/>}/>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

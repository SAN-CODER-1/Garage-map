import React, { useState } from "react";
import axios from "axios";
import { Wrench, Mail, Lock, User, Phone, Briefcase, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "USER"
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        form.role === "GARAGE_OWNER"
          ? "http://localhost:8080/auth/register/garage"
          : "http://localhost:8080/auth/register/user";

      await axios.post(url, form);

      alert("Registered successfully");
      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 -ml-48 -mt-48 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 -mr-48 -mb-48 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100 my-8"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-blue-600 p-3 rounded-xl mb-4 shadow-lg shadow-blue-500/30">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create an Account</h2>
          <p className="text-slate-500 text-sm mt-2">Join WheelConnect today</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                name="username" 
                required
                placeholder="johndoe"
                onChange={change} 
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="email"
                name="email" 
                required
                placeholder="you@example.com"
                onChange={change} 
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                name="phoneNumber" 
                required
                placeholder="+1 (555) 000-0000"
                onChange={change} 
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="password" 
                name="password" 
                required
                placeholder="••••••••"
                onChange={change} 
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 pb-2">
            <label className="text-xs font-semibold text-slate-700">I am a...</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <select 
                name="role" 
                onChange={change}
                required
                defaultValue="USER"
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none text-sm appearance-none"
              >
                <option value="USER">Customer / Driver</option>
                <option value="GARAGE_OWNER">Garage Owner</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg mt-4"
          >
            {isLoading ? "Creating Account..." : "Register"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition">
            Sign in instead
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
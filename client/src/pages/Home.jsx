import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, BatteryCharging, Droplets, Truck, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* Navbar Drop-in */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight">
            WheelConnect
          </h1>
        </div>

        <div className="space-x-8 hidden md:flex items-center text-sm font-medium">
          <Link to="/home" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/garages" className="text-slate-600 hover:text-blue-600 transition-colors">Garages</Link>
          <Link to="/garage-bookings" className="text-slate-600 hover:text-blue-600 transition-colors">Bookings</Link>
          <Link
            to="/login"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Sign In
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 py-32 md:py-48 flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-50 z-0"></div>
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl z-0"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-block">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-blue-200">
              ⚡ Available 24/7 in your city
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Instant Garage Help <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Near You</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Book nearby mechanics, request emergency towing, and get your vehicle repaired in seconds. Your journey shouldn't stop here.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/garages" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
              Find a Garage <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/garages" className="flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm hover:shadow transform hover:-translate-y-1">
              <Truck className="w-5 h-5 text-red-500" /> Emergency Help
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meticulous Care For Your Vehicle</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We connect you with certified professionals equipped to handle any of your automotive needs instantly.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Puncture Repair", desc: "Quick tire repair and replacements from trusted garages.", icon: Wrench, color: "text-orange-500", bg: "bg-orange-100" },
              { title: "Battery Jumpstart", desc: "Dead battery? Get instant on-site assistance.", icon: BatteryCharging, color: "text-blue-500", bg: "bg-blue-100" },
              { title: "Oil Change", desc: "Fast and reliable oil replacement services.", icon: Droplets, color: "text-teal-500", bg: "bg-teal-100" },
              { title: "Emergency Tow", desc: "24/7 vehicle breakdown towing support.", icon: Truck, color: "text-red-500", bg: "bg-red-100" }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className={`${service.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Garages Section */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Rated Near You</h2>
              <p className="text-slate-600">Discover highly-reviewed mechanics in your vicinity.</p>
            </motion.div>
            <Link to="/garages" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Speed Auto Garage", rating: "4.9", distance: "2.1 km", reviews: 128 },
              { name: "City Wheels Service", rating: "4.7", distance: "3.4 km", reviews: 84 },
              { name: "ProMechanic Hub", rating: "4.8", distance: "4.2 km", reviews: 201 }
            ].map((garage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{garage.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 gap-1 mb-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {garage.distance} away
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {garage.rating}
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">{garage.reviews} reviews</span>
                  <Link to="/garages" className="bg-slate-100 text-slate-800 px-5 py-2 rounded-full font-medium hover:bg-slate-200 transition-colors text-sm group-hover:bg-blue-600 group-hover:text-white">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/garages" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition space-x-1">
              <span>View All Garages</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-3xl z-0 rounded-full"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Stranded with a breakdown?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 mb-10"
          >
            Don't worry. We'll connect you with a certified mechanic nearby right away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/garages" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all transform hover:-translate-y-1">
              <Truck className="w-6 h-6" /> 
              Request Emergency Service
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" />
            <span className="text-xl font-bold text-white tracking-tight">WheelConnect</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} WheelConnect. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MessageSquare, Briefcase, Hash, Send } from "lucide-react";

function Review() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    garageId: "",
    rating: "",
    reviewComment: "",
    serviceQuality: "",
    punctuality: "",
    costFairness: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...form,
      bookingId: Number(bookingId),
      rating: Number(form.rating),
      serviceQuality: Number(form.serviceQuality),
      punctuality: Number(form.punctuality),
      costFairness: Number(form.costFairness)
    };

    try {
      await axios.post("http://localhost:8080/reviews", payload);
      alert("Review submitted successfully! Thank you.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Rate Your Service</h2>
          <p className="text-slate-500 text-sm mt-1">Booking #{bookingId}</p>
        </div>

        <form onSubmit={submitReview} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">User ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Hash className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  name="userId"
                  placeholder="e.g. 12"
                  value={form.userId}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Garage ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  name="garageId"
                  placeholder="e.g. 5"
                  value={form.garageId}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Scores (1-5)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Overall Rating</label>
                <input
                  type="number"
                  name="rating"
                  placeholder="1 to 5"
                  value={form.rating}
                  onChange={handleChange}
                  min="1" max="5" required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Service Quality</label>
                <input
                  type="number"
                  name="serviceQuality"
                  placeholder="1 to 5"
                  value={form.serviceQuality}
                  onChange={handleChange}
                  min="1" max="5" required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Punctuality</label>
                <input
                  type="number"
                  name="punctuality"
                  placeholder="1 to 5"
                  value={form.punctuality}
                  onChange={handleChange}
                  min="1" max="5" required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Cost Fairness</label>
                <input
                  type="number"
                  name="costFairness"
                  placeholder="1 to 5"
                  value={form.costFairness}
                  onChange={handleChange}
                  min="1" max="5" required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-700 uppercase mb-1.5 block">Review Comments</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="w-4 h-4 text-slate-400" />
              </div>
              <textarea
                name="reviewComment"
                required
                placeholder="Share your experience (what went well, what could improve)..."
                value={form.reviewComment}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-75"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
            {!isSubmitting && <Send className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Review;
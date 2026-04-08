import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Review() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

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

    const payload = {
      ...form,
      bookingId: Number(bookingId), // ✅ from URL
      rating: Number(form.rating),
      serviceQuality: Number(form.serviceQuality),
      punctuality: Number(form.punctuality),
      costFairness: Number(form.costFairness)
    };

    try {
      await axios.post("http://localhost:8080/reviews", payload);

      alert("Review submitted");

      // ✅ redirect after review
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error submitting review");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">

      <h2 className="text-xl font-bold mb-4">
        Give Review
      </h2>

      <form onSubmit={submitReview} className="flex flex-col gap-3">

        <input
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
          className="border p-2"
        />

        <input
          name="garageId"
          placeholder="Garage ID"
          value={form.garageId}
          onChange={handleChange}
          required
          className="border p-2"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
          className="border p-2"
        />

        <textarea
          name="reviewComment"
          placeholder="Write your review..."
          value={form.reviewComment}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="serviceQuality"
          placeholder="Service Quality (1-5)"
          value={form.serviceQuality}
          onChange={handleChange}
          min="1"
          max="5"
          className="border p-2"
        />

        <input
          type="number"
          name="punctuality"
          placeholder="Punctuality (1-5)"
          value={form.punctuality}
          onChange={handleChange}
          min="1"
          max="5"
          className="border p-2"
        />

        <input
          type="number"
          name="costFairness"
          placeholder="Cost Fairness (1-5)"
          value={form.costFairness}
          onChange={handleChange}
          min="1"
          max="5"
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2"
        >
          Submit Review
        </button>

      </form>
    </div>
  );
}

export default Review;
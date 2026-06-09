"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const Form = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.subject &&
    form.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Replace with your real contact API endpoint
      await new Promise((res) => setTimeout(res, 1500)); // simulate API call
      setSuccess("Message sent! We'll get back to you within 24 hours.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 bg-white overflow-y-auto">
      <div className="w-full max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src={"/images/Smart-Ruga-Logo.png"}
            width={250}
            height={70}
            alt="main-logo"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 text-center">
          Contact Us
        </h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Have a question or need support? We'd love to hear from you.
        </p>

        {/* Success / Error banners */}
        {success && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-[#f0fdf4] border border-[#d1fae5] text-sm text-[#4CAF50] font-medium">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={set("firstName")}
                placeholder="Enter your first name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={set("lastName")}
                placeholder="Enter your last name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Enter your email address"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Phone Number{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="Enter your phone number"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Subject
            </label>
            <input
              value={form.subject}
              onChange={set("subject")}
              placeholder="What is your message about?"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={set("message")}
              placeholder="Write your message here..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
              isValid && !loading
                ? "bg-[#4CAF50] hover:bg-[#43a047] text-white shadow-sm"
                : "bg-[#a5d6a7] text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Want to create an account?{" "}
          <Link
            href="/"
            className="text-[#4CAF50] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;

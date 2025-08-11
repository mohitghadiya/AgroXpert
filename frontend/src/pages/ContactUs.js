import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:8000/core/contact/", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact AgroXpert</h1>
              <p className="text-xl md:text-2xl text-green-100">
                We're here to help you with any questions about our services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="md:flex">
                {/* Contact Info */}
                <div className="md:w-2/5 bg-gradient-to-b from-green-700 to-green-800 p-8 md:p-12 text-white">
                  <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                  <p className="mb-8 text-green-100">
                    Fill out the form and our agricultural experts will get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <FaEnvelope className="text-xl mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Email us</h3>
                        <p className="text-green-100">agroxpertml@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaPhone className="text-xl mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Call us</h3>
                        <p className="text-green-100">+91 7624023373</p>
                        <p className="text-green-100">(Mon-Sat, 9AM-6PM)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-xl mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Headquarters</h3>
                        <p className="text-green-100">
                          AgroXpert Technologies<br />
                          123 Farm Lane, Agri Zone<br />
                          Ahmedabad, Gujrat 382350
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="md:w-3/5 p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-200"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-200"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-200"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-200"
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 rounded-lg font-medium text-white transition duration-200 ${
                        isSubmitting 
                          ? 'bg-green-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-none'
                      } flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-4 bg-green-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Location</h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117361.034188334!2d72.45509785820311!3d23.020497799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{border:0}}
                allowFullScreen="" 
                loading="lazy"
                title="AgroXpert Ahmedabad Location"
            ></iframe>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl mb-8">
              Call our farmer support helpline for urgent queries about crops, weather, or market prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+919313872776" 
                className="bg-white text-green-700 px-6 py-3 rounded-full font-medium hover:bg-green-50 hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <FaPhone className="mr-2" />
                Call Now: +91 9313872776
              </a>
              <a 
                href="/support" 
                className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 hover:shadow-lg transition-all duration-300"
              >
                Visit Support Center
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
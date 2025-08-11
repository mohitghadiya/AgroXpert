import React from 'react';
import { FaLeaf, FaTractor, FaChartLine, FaHandsHelping, FaGlobeAsia } from 'react-icons/fa';
import teamImage from '../images/team-farmers.jpg';
import farmImage from '../images/sustainable-farm.jpeg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const AboutUs = () => {
  const stats = [
    { value: '10,000+', label: 'Farmers Empowered' },
    { value: '500+', label: 'Villages Covered' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      icon: <FaLeaf className="text-4xl text-green-500" />,
      title: "Sustainability",
      description: "We promote eco-friendly farming practices that protect the environment while increasing yields."
    },
    {
      icon: <FaTractor className="text-4xl text-green-500" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve age-old farming challenges."
    },
    {
      icon: <FaChartLine className="text-4xl text-green-500" />,
      title: "Growth",
      description: "Committed to helping farmers increase their productivity and profitability."
    },
    {
      icon: <FaHandsHelping className="text-4xl text-green-500" />,
      title: "Community",
      description: "Building a network where farmers can share knowledge and resources."
    }
  ];

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About AgroXpert</h1>
              <p className="text-xl md:text-2xl text-green-100">
                Empowering farmers with technology for sustainable agriculture and food security
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src={teamImage} 
                  alt="AgroXpert team with farmers" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, AgroXpert began as a small initiative to help farmers in rural India access better farming technologies. 
                  What started as a passion project has now grown into a movement transforming agriculture across the country.
                </p>
                <p className="text-gray-600 mb-4">
                  Our team of agronomists, technologists, and farming experts came together with a shared vision - to make advanced farming 
                  knowledge and tools accessible to every farmer, regardless of their location or scale of operation.
                </p>
                <p className="text-gray-600">
                  Today, we serve thousands of farmers across multiple states, helping them increase yields, reduce costs, and connect with 
                  markets more effectively than ever before.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-green-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact in Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-lg text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src={farmImage} 
                  alt="Sustainable farming" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At AgroXpert, we're on a mission to revolutionize Indian agriculture by bridging the gap between traditional farming 
                  wisdom and modern agricultural technology.
                </p>
                <p className="text-gray-600 mb-4">
                  We believe every farmer deserves access to accurate weather forecasts, soil health analysis, market prices, and expert 
                  advice - all in one place, in their local language.
                </p>
                <div className="flex items-center mt-8">
                  <FaGlobeAsia className="text-3xl text-green-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Vision</h3>
                    <p className="text-gray-600">
                      To become India's most trusted agricultural platform, empowering 1 million farmers by 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-4 bg-green-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-xl mb-8">
              Whether you're a farmer looking for better tools or an expert wanting to share knowledge, we'd love to have you with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/signup" 
                className="bg-white text-green-700 px-6 py-3 rounded-full font-medium hover:bg-green-50 hover:shadow-lg transition-all duration-300"
              >
                Sign Up Now
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 hover:shadow-lg transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
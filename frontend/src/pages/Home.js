import { FaSeedling, FaTractor, FaLeaf, FaArrowRight, FaUserFriends, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { ShoppingCart, Cloud, BarChart3, Users, Leaf } from 'lucide-react';
import riceField from '../images/carosal.webp';
import farmerImage from '../images/India_Farming.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const features = [
  {
    icon: ShoppingCart,
    title: "Smart Marketplace",
    description: "Buy and sell agricultural products with transparent pricing and quality assurance.",
    stats: "500+ products listed"
  },
  {
    icon: Cloud,
    title: "Weather Intelligence",
    description: "Get accurate weather forecasts and agricultural insights for better crop planning.",
    stats: "95% forecast accuracy"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your farm performance with detailed analytics and reporting tools.",
    stats: "30% yield improvement"
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with fellow farmers and agricultural experts in your region.",
    stats: "10K+ farmers connected"
  }
];

// const testimonials = [
//   {
//     img: "https://randomuser.me/api/portraits/men/32.jpg",
//     quote: "With KrishiXpert, my yield increased by 30%! The support and technology are unmatched.",
//     name: "Rakesh Kumar",
//     location: "Organic Farmer, Uttar Pradesh",
//     result: "Yield increased by 30%"
//   },
//   {
//     img: "https://randomuser.me/api/portraits/women/44.jpg",
//     quote: "The expert advice and timely delivery of seeds helped me modernize my farm.",
//     name: "Sunita Devi",
//     location: "Crop Specialist, Maharashtra",
//     result: "Reduced costs by 20%"
//   },
//   {
//     img: "https://randomuser.me/api/portraits/men/65.jpg",
//     quote: "I love the easy-to-use platform and the community support. Highly recommended!",
//     name: "Ajay Singh",
//     location: "Farmer, Punjab",
//     result: "Doubled profits"
//   }
// ];


const testimonials = [
  {
    img: "https://cdn.pixabay.com/photo/2021/12/09/05/22/worker-6857370_1280.jpg", // Indian farmer with turban
    quote: "With AgroXpert, my yield increased by 30%! The support and technology are unmatched.",
    name: "Rakesh Kumar",
    location: "Organic Farmer, Uttar Pradesh",
    result: "Yield increased by 30%"
  },
  {
    img: "https://cdn.pixabay.com/photo/2022/01/19/06/10/adivasi-6948880_1280.jpg", // Indian woman farmer
    quote: "The expert advice and timely delivery of seeds helped me modernize my farm.",
    name: "Sunita Devi",
    location: "Farmer, Maharashtra",
    result: "Reduced costs by 20%"
  },
  {
    img: "https://cdn.pixabay.com/photo/2018/11/30/06/27/farmer-3847057_1280.jpg", // Elderly Indian farmer
    quote: "I love the easy-to-use platform and the community support. Highly recommended!",
    name: "Ajay Patel",
    location: "Farmer, Gujrat",
    result: "Doubled profits"
  }
];

export default function Home() {
  return (
    <div className="font-sans bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${riceField})` }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-700/60 to-green-400/40"></div>
        
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar className="bg-transparent text-white"/>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            ADVANCING <span className="text-green-300">AGRITECH</span><br />THROUGH SMART FARMING
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Designing a tech-driven ecosystem that makes farming inputs more affordable and accessible for every farmer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#about" 
              className="bg-white text-green-700 px-8 py-3 rounded-full font-medium hover:bg-green-50 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              Learn More <FaArrowRight />
            </a>
            <a 
              href="#features" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img 
              src={farmerImage} 
              alt="Farming" 
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover border-4 border-green-200 hover:shadow-xl transition-shadow duration-500"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800">
              Go Smarter with <span className="text-green-600">AgroXpert</span>
            </h2>
            <p className="text-lg text-gray-700">
              Your complete agriculture solution combining marketplace, weather intelligence, and farm management tools in one powerful platform.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                <Leaf className="text-green-600 h-6 w-6 mb-2" />
                <h3 className="font-semibold text-green-800">Organic Focus</h3>
                <p className="text-sm text-gray-600">Sustainable farming solutions</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                <FaTractor className="text-green-600 h-6 w-6 mb-2" />
                <h3 className="font-semibold text-green-800">Tech Driven</h3>
                <p className="text-sm text-gray-600">Modern farming techniques</p>
              </div>
            </div>
            <a href='/about'>
            <button  className="border border-green-500 text-green-700 px-8 py-3 rounded-full font-medium hover:bg-green-50 hover:shadow-md transition-all duration-300 flex items-center gap-2 mt-4">
              More About Us <FaUserFriends />
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Modern Farming
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and insights to help you make informed decisions and maximize your agricultural success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {feature.stats}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-6 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 hover:bg-green-700/30 rounded-lg transition-all">
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-lg">Farmers Empowered</div>
          </div>
          <div className="p-6 hover:bg-green-700/30 rounded-lg transition-all">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-lg">Products Listed</div>
          </div>
          <div className="p-6 hover:bg-green-700/30 rounded-lg transition-all">
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-lg">Weather Accuracy</div>
          </div>
          <div className="p-6 hover:bg-green-700/30 rounded-lg transition-all">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-lg">Support Available</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Farmers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from people who have transformed their lives with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img 
                src={testimonial.img} 
                alt={testimonial.name} 
                className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-green-200"
              />
              <p className="text-gray-700 mb-4 italic text-center">"{testimonial.quote}"</p>
              <div className="font-semibold text-green-600">{testimonial.name}</div>
              <div className="text-sm text-gray-500 mb-2">{testimonial.location}</div>
              <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from KrishiXpert's smart farming solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href='/signup'>
            <button className="bg-white text-green-700 px-12 py-3 rounded-full font-medium hover:bg-green-50 hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              Get Started <FaArrowRight />
            </button>
            </a>
          </div>
        </div>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
}
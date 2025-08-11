// // import React from "react";
// import { Link } from "react-router-dom";
// import {
//   HiOutlineClipboardList,
//   HiOutlineShoppingCart,
//   HiOutlineCloud,
//   HiOutlineDocumentText,
//   HiOutlineChartBar,
// } from "react-icons/hi";

// function FarmerDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
//       <div className="max-w-5xl mx-auto">
//         <header className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-green-900 flex items-center gap-2">
//             👨‍🌾 Farmer Dashboard
//           </h1>
//           <div className="mt-4 md:mt-0">
//             <span className="bg-green-200 text-green-900 px-4 py-2 rounded-lg font-semibold">
//               Welcome, {user?.username || user?.full_name || "Farmer"}
//             </span>
//           </div>
//         </header>

//         <section>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Request Soil Test */}
//             <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
//               <HiOutlineClipboardList className="text-4xl text-green-600 mb-2" />
//               <h3 className="text-lg font-semibold mb-2">Request Soil Test</h3>
//               <p className="text-gray-600 mb-4 text-center">
//                 Submit a new soil test request to a lab.
//               </p>
//               <Link
//                 to="/soil-analysis"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               >
//                 Go to Soil Test
//               </Link>
//             </div>

//             {/* View Results */}
//             <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
//               <HiOutlineDocumentText className="text-4xl text-blue-600 mb-2" />
//               <h3 className="text-lg font-semibold mb-2">Test Status</h3>
//               <p className="text-gray-600 mb-4 text-center">
//                 Track your test status and view PDF reports.
//               </p>
//               <Link
//                 to="/soil-status"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 View Status
//               </Link>
//             </div>

//             {/* Other Cards (Marketplace, Weather, Crop) */}
//             <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
//               <HiOutlineShoppingCart className="text-4xl text-yellow-600 mb-2" />
//               <h3 className="text-lg font-semibold mb-2">Marketplace</h3>
//               <Link
//                 to="/marketplace"
//                 className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
//               >
//                 Go to Marketplace
//               </Link>
//             </div>

//             <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
//               <HiOutlineCloud className="text-4xl text-cyan-600 mb-2" />
//               <h3 className="text-lg font-semibold mb-2">Weather Forecast</h3>
//               <Link
//                 to="/weather-dashboard"
//                 className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
//               >
//                 Check Weather
//               </Link>
//             </div>

//             <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
//               <HiOutlineChartBar className="text-4xl text-purple-600 mb-2" />
//               <h3 className="text-lg font-semibold mb-2">Crop Suggestions</h3>
//               <Link
//                 to="/crop-recommend"
//                 className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
//               >
//                 Recommend Crops
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default FarmerDashboard;




// import { Link } from "react-router-dom";
// import {
//   HiOutlineClipboardList,
//   HiOutlineShoppingCart,
//   HiOutlineCloud,
//   HiOutlineDocumentText,
//   HiOutlineChartBar,
//   HiOutlineUserCircle,
//   HiOutlineBell,
//   HiOutlineCalendar,
// } from "react-icons/hi";

// function FarmerDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const cards = [
//     {
//       icon: <HiOutlineClipboardList className="text-4xl" />,
//       title: "Request Soil Test",
//       description: "Submit a new soil test request to a lab.",
//       link: "/soil-analysis",
//       color: "bg-green-100 text-green-600",
//       btnColor: "bg-green-600 hover:bg-green-700",
//     },
//     {
//       icon: <HiOutlineDocumentText className="text-4xl" />,
//       title: "Test Status",
//       description: "Track your test status and view PDF reports.",
//       link: "/soil-status",
//       color: "bg-blue-100 text-blue-600",
//       btnColor: "bg-blue-600 hover:bg-blue-700",
//     },
//     {
//       icon: <HiOutlineShoppingCart className="text-4xl" />,
//       title: "Marketplace",
//       description: "Buy and sell agricultural products.",
//       link: "/marketplace",
//       color: "bg-yellow-100 text-yellow-600",
//       btnColor: "bg-yellow-600 hover:bg-yellow-700",
//     },
//     {
//       icon: <HiOutlineCloud className="text-4xl" />,
//       title: "Weather Forecast",
//       description: "Get accurate weather predictions for your farm.",
//       link: "/weather-dashboard",
//       color: "bg-cyan-100 text-cyan-600",
//       btnColor: "bg-cyan-600 hover:bg-cyan-700",
//     },
//     {
//       icon: <HiOutlineChartBar className="text-4xl" />,
//       title: "Crop Suggestions",
//       description: "Get AI-powered crop recommendations.",
//       link: "/crop-recommend",
//       color: "bg-purple-100 text-purple-600",
//       btnColor: "bg-purple-600 hover:bg-purple-700",
//     },
//     {
//       icon: <HiOutlineUserCircle className="text-4xl" />,
//       title: "Profile",
//       description: "Manage your account and settings.",
//       link: "/profile",
//       color: "bg-orange-100 text-orange-600",
//       btnColor: "bg-orange-600 hover:bg-orange-700",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <header className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-green-100 rounded-full animate-pulse">
//               <span className="text-2xl">👨‍🌾</span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-green-900">
//               Farmer Dashboard
//             </h1>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 relative">
//               <HiOutlineBell className="text-xl text-gray-600" />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <div className="bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-3 hover:shadow-lg transition-all duration-300">
//               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                 <HiOutlineUserCircle className="text-green-600 text-xl" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Welcome back</p>
//                 <p className="font-semibold text-green-800">
//                   {user?.username || user?.full_name || "Farmer"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Weather Alert Banner */}
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg animate-[pulse_2s_infinite]">
//           <div className="flex items-center gap-3">
//             <HiOutlineCalendar className="text-yellow-500 text-xl" />
//             <div>
//               <p className="font-medium text-yellow-800">Weather Alert</p>
//               <p className="text-sm text-yellow-700">
//                 Expected rainfall in your area tomorrow. Plan your irrigation accordingly.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Cards */}
//         <section className="mb-12">
//           <h2 className="text-xl font-semibold text-gray-700 mb-6">
//             Quick Actions
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cards.map((card, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
//               >
//                 <div className="p-6 flex flex-col items-center text-center h-full">
//                   <div
//                     className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110`}
//                   >
//                     {card.icon}
//                   </div>
//                   <h3 className="text-lg font-semibold mb-2 text-gray-800">
//                     {card.title}
//                   </h3>
//                   <p className="text-gray-600 mb-5 flex-grow">
//                     {card.description}
//                   </p>
//                   <Link
//                     to={card.link}
//                     className={`${card.btnColor} text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg w-full text-center`}
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="bg-white rounded-xl shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-6">
//             Your Farming Stats
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { value: "5", label: "Active Requests", trend: "↑ 2" },
//               { value: "12", label: "Completed Tests", trend: "↑ 5" },
//               { value: "₹24,500", label: "Marketplace Sales", trend: "↑ ₹3,200" },
//               { value: "8", label: "Saved Locations", trend: "→" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-gray-100 text-center hover:shadow-sm transition-all duration-300"
//               >
//                 <p className="text-2xl font-bold text-green-700">{stat.value}</p>
//                 <p className="text-gray-600">{stat.label}</p>
//                 <p className="text-xs mt-1 text-green-600 font-medium">
//                   {stat.trend}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Recent Activity */}
//         <section className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-700">
//               Recent Activity
//             </h2>
//             <Link to="/activity" className="text-sm text-green-600 hover:underline">
//               View All
//             </Link>
//           </div>
//           <div className="space-y-4">
//             {[
//               {
//                 action: "Soil test submitted",
//                 date: ", 10:30 AM",
//                 status: "Pending",
//                 icon: <HiOutlineClipboardList className="text-green-500" />,
//               },
//               {
//                 action: "Weather alert received",
//                 date: "Yesterday, 3:45 PM",
//                 status: "Viewed",
//                 icon: <HiOutlineCloud className="text-blue-500" />,
//               },
//               {
//                 action: "New crop recommendation",
//                 date: "2 days ago",
//                 status: "New",
//                 icon: <HiOutlineChartBar className="text-purple-500" />,
//               },
//             ].map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-4 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors duration-200"
//               >
//                 <div className="p-2 bg-gray-100 rounded-full">
//                   {activity.icon}
//                 </div>
//                 <div className="flex-grow">
//                   <p className="font-medium text-gray-800">{activity.action}</p>
//                   <p className="text-sm text-gray-500">{activity.date}</p>
//                 </div>
//                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                   {activity.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default FarmerDashboard;









import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa"; // Font Awesome leaf icon
import {
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlineCloud,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineTrendingUp,
  HiOutlineBeaker,
  HiOutlineLightBulb,
  HiOutlineEmojiHappy, // Using this as alternative for plant/disease detection
} from "react-icons/hi";


function FarmerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
    {
      icon: <HiOutlineClipboardList className="text-4xl" />,
      title: "Request Soil Test",
      description: "Submit a new soil test request to a lab.",
      link: "/soil-analysis",
      color: "bg-green-100 text-green-600",
      btnColor: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: <HiOutlineDocumentText className="text-4xl" />,
      title: "Test Status",
      description: "Track your test status and view PDF reports.",
      link: "/soil-status",
      color: "bg-blue-100 text-blue-600",
      btnColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <HiOutlineCloud className="text-4xl" />,
      title: "Weather Forecast",
      description: "Get accurate weather predictions for your farm.",
      link: "/weather-dashboard",
      color: "bg-cyan-100 text-cyan-600",
      btnColor: "bg-cyan-600 hover:bg-cyan-700",
    },
    {
      icon: <HiOutlineChartBar className="text-4xl" />,
      title: "Crop Suggestions",
      description: "Get AI-powered crop recommendations.",
      link: "/crop-recommend",
      color: "bg-purple-100 text-purple-600",
      btnColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: <HiOutlineBeaker className="text-4xl" />,
      title: "Fertilizer Recommendation",
      description: "Get customized fertilizer suggestions.",
      link: "/fertilizer-recommend",
      color: "bg-orange-100 text-orange-600",
      btnColor: "bg-orange-600 hover:bg-orange-700",
    },
    {
      icon: <HiOutlineTrendingUp className="text-4xl" />,
      title: "Yield Prediction",
      description: "Estimate your crop yield potential.",
      link: "/yield-prediction",
      color: "bg-red-100 text-red-600",
      btnColor: "bg-red-600 hover:bg-red-700",
    },
    {
      icon: <HiOutlineLightBulb className="text-4xl" />,
      title: "Plant Health Check",
      description: "find plant name from leaf.",
      link: "/disease",
      color: "bg-lime-100 text-lime-600",
      btnColor: "bg-lime-600 hover:bg-lime-700",
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full animate-pulse">
              <span className="text-2xl">👨‍🌾</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-900">
              Farmer Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 relative">
              <HiOutlineBell className="text-xl text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-3 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <HiOutlineUserCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back</p>
                <p className="font-semibold text-green-800">
                  {user?.username || user?.full_name || "Farmer"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Weather Alert Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg animate-[pulse_2s_infinite]">
          <div className="flex items-center gap-3">
            <HiOutlineCalendar className="text-yellow-500 text-xl" />
            <div>
              <p className="font-medium text-yellow-800">Weather Alert</p>
              <p className="text-sm text-yellow-700">
                Expected rainfall in your area tomorrow. Plan your irrigation accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div
                    className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-5 flex-grow">
                    {card.description}
                  </p>
                  <Link
                    to={card.link}
                    className={`${card.btnColor} text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg w-full text-center`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        
      </div>


    </div>
  );
}

export default FarmerDashboard;
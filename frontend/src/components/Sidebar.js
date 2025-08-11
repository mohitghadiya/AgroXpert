// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { HiHome, HiChartBar, HiClipboardList, HiShoppingCart, HiCloud, HiX } from 'react-icons/hi';

// const navItems = [
//   { to: '/farmer-dashboard', icon: <HiHome />, label: 'Dashboard' },
//   { to: '/crop-recommend', icon: <HiChartBar />, label: 'Crop Recommendation' },
//   { to: '/soil-analysis', icon: <HiClipboardList />, label: 'Soil Test' },
//   { to: '/marketplace', icon: <HiShoppingCart />, label: 'Marketplace' },
//   { to: '/weather-dashboard', icon: <HiCloud />, label: 'Weather' },
// ];

// const Sidebar = ({ open, onClose }) => {
//   const location = useLocation();

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity"
//           onClick={onClose}
//           aria-label="Close sidebar"
//         />
//       )}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50 transform transition-transform
//         ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block flex flex-col`}
//         style={{ maxHeight: '100vh' }}
//       >
//         {/* Mobile close button */}
//         <div className="flex md:hidden justify-end p-2">
//           <button onClick={onClose} aria-label="Close sidebar">
//             <HiX className="text-2xl text-green-700" />
//           </button>
//         </div>
//         <div className="p-6 text-2xl font-bold text-green-700 border-b flex items-center gap-2">
//           <span role="img" aria-label="logo">🌱</span> KrishiXpert
//         </div>
//         <nav className="flex-1 p-4 overflow-y-auto">
//           {navItems.map(item => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition font-medium ${
//                 location.pathname === item.to
//                   ? 'bg-green-100 text-green-700'
//                   : 'text-gray-700 hover:bg-green-50'
//               }`}
//               onClick={onClose}
//             >
//               <span className="text-xl">{item.icon}</span>
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";
// import { RiShutDownLine } from "react-icons/ri";
// import { BiHomeAlt } from "react-icons/bi";
// import { RiTestTubeLine } from "react-icons/ri";
// import { IoCloudOutline } from "react-icons/io5"; 
// import { VscGraph } from "react-icons/vsc";
// import { LiaSprayCanSolid } from "react-icons/lia";
// import { IoMdTrendingUp } from "react-icons/io";
// import { GiPlantRoots } from "react-icons/gi";
// import { FaUserCircle } from "react-icons/fa";

// export default function Sidebar({className, yes, no}) {
//   const navItems = [
//     { to: '/farmer-dashboard', icon: <BiHomeAlt />, label: 'Dashboard' },
//     { to: '/crop-recommend', icon: <VscGraph />, label: 'Crop Recommendation' },
//     { to: '/soil-analysis', icon: <RiTestTubeLine />, label: 'Soil Test' },
//     { to: '/weather-dashboard', icon: <IoCloudOutline />, label: 'Weather' },
//     { to: '/fertilizer-recommend', icon: <LiaSprayCanSolid />, label: 'Fertilizer Recommend' },
//     { to: '/yield-prediction', icon: <IoMdTrendingUp />, label: 'Yield Prediction' },
//     { to: '/disease', icon: <GiPlantRoots />, label: 'Leaf Detection' },
//     { to: '/profile', icon: <FaUserCircle />, label: 'My Profile' }
//   ];
  
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
  
//   // Close sidebar when clicking outside on mobile
//   const handleOutsideClick = () => {
//     if (window.innerWidth < 1024) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={handleOutsideClick}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-md flex flex-col pt-2 transition-all duration-300 z-50
//           ${isOpen ? "w-64" : "w-0"} lg:w-72 lg:translate-x-0 overflow-hidden lg:overflow-visible`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-3">
//           <h1 className="font-bold text-3xl whitespace-nowrap">KrishiXpert</h1>
//           <button
//             className="p-2 rounded-md lg:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <HiX size={24} />
//           </button>
//         </div>

//         {/* Navigation Items */}
//         <ul className="space-y-2 mt-6 flex-1">
//           {navItems.map((item) => (
//             <li key={item.to} className="px-1">
//               <a
//                 href={item.to}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition whitespace-nowrap
//                   ${location.pathname === item.to ? yes : no}`}
//                 onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
//               >
//                 <span className="text-2xl">{item.icon}</span>
//                 <span className="lg:inline pl-2">{item.label}</span>
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Footer Section */}
//         <div className="px-3 pb-4">
//           <hr className="my-2" />
//           <div className="flex gap-4 items-center mt-3">
//             <img 
//               src="https://randomuser.me/api/portraits/men/65.jpg" 
//               alt="profile" 
//               className="w-12 h-12 rounded-full object-cover" 
//             />
//             <h1 className="font-medium">Mohit Ghadiya</h1>
//           </div>
//           <button className="w-full flex gap-2 items-center justify-center rounded-lg px-3 py-2 mt-3 text-red-700 bg-red-100 hover:bg-red-200 transition duration-300">
//             <RiShutDownLine className="h-5 w-5" />
//             <span>Log Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu button */}
//       {!isOpen && (
//         <button
//           className={`fixed left-4 top-4 z-40 p-2 bg-white rounded-md shadow-lg lg:hidden ${className}`}
//           onClick={() => setIsOpen(true)}
//         >
//           <HiMenu size={24} />
//         </button>
//       )}
//     </>
//   );
// }






import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { RiShutDownLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { RiTestTubeLine } from "react-icons/ri";
import { IoCloudOutline } from "react-icons/io5"; 
import { VscGraph } from "react-icons/vsc";
import { LiaSprayCanSolid } from "react-icons/lia";
import { IoMdTrendingUp } from "react-icons/io";
import { GiPlantRoots } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar({className, yes, no}) {
  const navItems = [
    { to: '/farmer-dashboard', icon: <BiHomeAlt />, label: 'Dashboard' },
    { to: '/crop-recommend', icon: <VscGraph />, label: 'Crop Recommendation' },
    { to: '/soil-analysis', icon: <RiTestTubeLine />, label: 'Soil Test' },
    { to: '/weather-dashboard', icon: <IoCloudOutline />, label: 'Weather' },
    { to: '/fertilizer-recommend', icon: <LiaSprayCanSolid />, label: 'Fertilizer Recommend' },
    { to: '/yield-prediction', icon: <IoMdTrendingUp />, label: 'Yield Prediction' },
    { to: '/disease', icon: <GiPlantRoots />, label: 'Leaf Detection' },
  ];


  const user = JSON.parse(localStorage.getItem("user"));

  
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  const handleOutsideClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Perform logout actions here:
    // 1. Clear user data from localStorage/sessionStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // 2. Redirect to login page
    navigate('/');
    
    // 3. Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
    
    // Note: If you're using authentication context, you would also update that state here
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleOutsideClick}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md flex flex-col pt-2 transition-all duration-300 z-50
          ${isOpen ? "w-64" : "w-0"} lg:w-72 lg:translate-x-0 overflow-hidden lg:overflow-visible`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-3">
          <h1 className="font-bold text-3xl whitespace-nowrap">AgroXpert</h1>
          <button
            className="p-2 rounded-md lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-2 mt-6 flex-1">
          {navItems.map((item) => (
            <li key={item.to} className="px-1">
              <a
                href={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition whitespace-nowrap
                  ${location.pathname === item.to ? yes : no}`}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="lg:inline pl-2">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer Section */}
        <div className="px-3 pb-4">
          <hr className="my-2" />
          <div className="flex gap-4 items-center mt-3">
            <img 
              src="https://randomuser.me/api/portraits/men/65.jpg" 
              alt="profile" 
              className="w-12 h-12 rounded-full object-cover" 
            />
            <h1 className="font-medium">{user?.username || user?.full_name || "Farmer"}</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex gap-2 items-center justify-center rounded-lg px-3 py-2 mt-3 text-red-700 bg-red-100 hover:bg-red-200 transition duration-300"
          >
            <RiShutDownLine className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      {!isOpen && (
        <button
          className={`fixed left-4 top-4 z-40 p-2 bg-white rounded-md shadow-lg lg:hidden ${className}`}
          onClick={() => setIsOpen(true)}
        >
          <HiMenu size={24} />
        </button>
      )}
    </>
  );
}
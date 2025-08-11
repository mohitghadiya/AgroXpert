// -----------------------------------------------------------------------------------finalcode--------------------------------------------------------------------------


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import SidebarLayout from "./components/SidebarLayout"; // <-- import this new wrapper

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FarmerDashboard from "./components/FarmerDashboard";
import WeatherDashboard from "./pages/WeatherDashboard";
import FarmerSoilTestForm from "./components/FarmerSoilTestForm";
import FarmerTestStatus from "./components/FarmerTestStatus";
import LabDashboard from "./components/LabDashboard";
import LabSoilTestList from "./components/LabSoilTestList";

import CropRecommend from "./components/CropRecommend";
import FertilizerRecommendation from "./components/FertilizerRecommendation";


import YieldPrediction from "./pages/yield_prediction";

import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";

import AboutUs from "./pages/about";
import ContactUs from "./pages/ContactUs";


function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}

function DashboardRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (user.role === "Farmer") return <Navigate to="/farmer-dashboard" />;
  if (user.role === "Lab") return <Navigate to="/lab-dashboard" />;
  return <Navigate to="/" />;
}



function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Home with Navbar only */}
        <Route path="/" element={<Home />} />
        
        {/* Login/Signup - no Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Farmer routes with Sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/weather-dashboard" element={<WeatherDashboard />} />
          <Route path="/soil-analysis" element={<FarmerSoilTestForm farmerId={user?.user_id} />} />
          <Route path="/soil-status" element={<FarmerTestStatus farmerId={user?.user_id} />} />
          <Route path="/crop-recommend" element={<CropRecommend />} />
          <Route path="/yield-prediction" element={<YieldPrediction />} />
          <Route path="/fertilizer-recommend" element={<FertilizerRecommendation />} />
          <Route path="/disease" element={<DiseaseDetectionPage />} />
        </Route>

        {/* Lab routes without Sidebar */}
        <Route path="/lab-dashboard" element={<LabDashboard labId={user?.user_id} />} />
        <Route path="/lab-requests" element={<LabSoilTestList labId={user?.user_id} />} />

        
        {/* Other routes */}
      
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        


      </Routes>
    </Router>
    
  );
}

 export default App;
// import React, { useState } from "react";
// import axios from "axios";

// const YieldPrediction = () => {
//   const cropTypes = [
//   "wheat", "rice", "maize", "barley", "soybean", 
//   "cotton", "sugarcane"
// ];

// const soilTypes = [
//   "loamy", "clay", "sandy", "silty"
// ];

//   const [formData, setFormData] = useState({
//     crop: "",
//     soil: "",
//     N: "",
//     P: "",
//     K: "",
//     rainfall: "",
//     temperature: "",
//     area: ""
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     setError(null);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/core/yield/predict/", 
//         formData
//       );
//       setResult(response.data.predicted_yield);
//     } catch (err) {
//       setError(err.response?.data?.error || "Error predicting yield. Please check your inputs.");
//       console.error("Prediction error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6 flex items-center justify-center gap-2">
//           <span className="text-3xl">🌾</span> Crop Yield Prediction
//         </h2>
        
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//           {/* Crop Type Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Crop Type *
//             </label>
//             <select
//               name="crop"
//               value={formData.crop}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
//             >
//               <option value="">Select Crop</option>
//               {cropTypes.map((crop) => (
//                 <option key={crop} value={crop}>
//                   {crop}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Soil Type Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Soil Type *
//             </label>
//             <select
//               name="soil"
//               value={formData.soil}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
//             >
//               <option value="">Select Soil</option>
//               {soilTypes.map((soil) => (
//                 <option key={soil} value={soil}>
//                   {soil}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Numeric Input Fields */}
//           {[
//             { name: "N", label: "Nitrogen (N) ppm *", min: 0, max: 140 },
//             { name: "P", label: "Phosphorus (P) ppm *", min: 5, max: 145 },
//             { name: "K", label: "Potassium (K) ppm *", min: 5, max: 205 },
//             { name: "temperature", label: "Temperature (°C) *", min: 8, max: 44, step: 0.1 },
//             { name: "rainfall", label: "Rainfall (mm) *", min: 20, max: 300 },
//             { name: "area", label: "Cultivation Area (hectare) *", min: 0.1, step: 0.1 }
//           ].map(({ name, label, min, max, step }) => (
//             <div key={name}>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//               </label>
//               <input
//                 type="number"
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 required
//                 min={min}
//                 max={max}
//                 step={step || 1}
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
//               />
//             </div>
//           ))}

//           <div className="md:col-span-2  text-center mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto ${
//                 loading ? "opacity-75 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Predicting...
//                 </span>
//               ) : (
//                 "Predict Yield"
//               )}
//             </button>
//           </div>
//         </form>

//         {result && (
//           <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
//             <h3 className="text-lg font-semibold text-green-800">
//               🎉 Prediction Successful!
//             </h3>
//             <p className="text-xl mt-2 font-bold text-green-600">
//               Estimated Yield: {result} tons/hectare
//             </p>
//             <p className="text-sm mt-2 text-gray-600">
//               Based on your inputs and our AI model
//             </p>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 p-3 bg-red-50 rounded-xl text-center text-red-600 font-medium">
//             ⚠️ {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default YieldPrediction;



import React, { useState } from "react";
import axios from "axios";

const YieldPrediction = () => {
  const cropTypes = [
    "wheat", "rice", "maize", "barley", "soybean", 
    "cotton", "sugarcane"
  ];

  const soilTypes = [
    "loamy", "clay", "sandy", "silty"
  ];

  const [formData, setFormData] = useState({
    crop: "",
    soil: "",
    N: "",
    P: "",
    K: "",
    rainfall: "",
    temperature: "",
    area: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/core/yield/predict/", 
        formData
      );
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      setResult(response.data.predicted_yield);
    } catch (err) {
      setError(err.response?.data?.error || "Error predicting yield. Please check your inputs.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 animate-gradient">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6 flex items-center justify-center gap-2 animate-bounce">
          <span className="text-3xl animate-pulse">🌾</span> 
          <span className="animate-fade-in">Crop Yield Prediction</span>
        </h2>
        
        <form 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Crop Type Dropdown */}
          <div className="animate-fade-in-up delay-75">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Type *
            </label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 hover:border-green-300"
            >
              <option value="">Select Crop</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>
                  {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Soil Type Dropdown */}
          <div className="animate-fade-in-up delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soil Type *
            </label>
            <select
              name="soil"
              value={formData.soil}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 hover:border-green-300"
            >
              <option value="">Select Soil</option>
              {soilTypes.map((soil) => (
                <option key={soil} value={soil}>
                  {soil.charAt(0).toUpperCase() + soil.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Numeric Input Fields */}
          {[
            { name: "N", label: "Nitrogen (N) ppm *", min: 0, max: 140 },
            { name: "P", label: "Phosphorus (P) ppm *", min: 5, max: 145 },
            { name: "K", label: "Potassium (K) ppm *", min: 5, max: 205 },
            { name: "temperature", label: "Temperature (°C) *", min: 8, max: 44, step: 0.1 },
            { name: "rainfall", label: "Rainfall (mm) *", min: 20, max: 300 },
            { name: "area", label: "Cultivation Area (hectare) *", min: 0.1, step: 0.1 }
          ].map(({ name, label, min, max, step }, index) => (
            <div 
              key={name}
              className={`animate-fade-in-up delay-${150 + (index * 50)}`}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                min={min}
                max={max}
                step={step || 1}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 hover:border-green-300"
              />
            </div>
          ))}

          <div className="md:col-span-2 text-center mt-4 animate-fade-in-up delay-500">
            <button
              type="submit"
              disabled={loading}
              className={`relative overflow-hidden bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto ${
                loading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Predict Yield</span>
                  <span className="absolute inset-0 bg-green-700 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl text-center animate-fade-in">
            <div className="animate-bounce">
              <h3 className="text-lg font-semibold text-green-800">
                🎉 Prediction Successful!
              </h3>
            </div>
            <p className="text-xl mt-2 font-bold text-green-600 animate-pulse">
              Estimated Yield: {result} tons/hectare
            </p>
            <p className="text-sm mt-2 text-gray-600">
              Based on your inputs and our AI model
            </p>
            <div className="mt-3 flex justify-center">
              <div className="w-16 h-1 bg-green-300 rounded-full animate-scale-x"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-xl text-center text-red-600 font-medium animate-shake">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldPrediction;
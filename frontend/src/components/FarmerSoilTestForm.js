

// ------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FiCalendar, FiClipboard, FiDroplet, FiSend } from "react-icons/fi";
// import { FaFlask, FaSeedling } from "react-icons/fa";

// const FarmerSoilTestForm = ({ farmerId }) => {
//   const [labs, setLabs] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     lab: "",
//     soil_type: "",
//     appointment_date: "",
//     notes: "",
//   });

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/core/labs/");
//         setLabs(response.data);
//       } catch (error) {
//         toast.error("🔴 Failed to load labs. Please try again later.");
//         console.error("Error fetching labs:", error);
//       }
//     };
    
//     fetchLabs();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       let appointment_date = formData.appointment_date;
//       if (appointment_date.length === 16) appointment_date += ":00";
      
//       const payload = {
//         ...formData,
//         farmer: farmerId,
//         appointment_date,
//         status: "Pending"
//       };

//       await axios.post("http://localhost:8000/core/soiltest/create/", payload);
      
//       toast.success("✅ Soil test request submitted successfully!", {
//         duration: 4000,
//       });
      
//       // Reset form
//       setFormData({ 
//         lab: "", 
//         soil_type: "", 
//         appointment_date: "", 
//         notes: "" 
//       });
      
//     } catch (err) {
//       let errorMsg = "❌ Failed to submit soil test request";
      
//       if (err.response) {
//         if (err.response.data?.detail) {
//           errorMsg = `❌ ${err.response.data.detail}`;
//         } else if (err.response.data) {
//           errorMsg = `❌ ${JSON.stringify(err.response.data)}`;
//         }
//       }
      
//       toast.error(errorMsg, { duration: 5000 });
//       console.error("Submission error:", err);
      
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Common soil types for suggestions
//   const commonSoilTypes = [
//     "Clay", "Sandy", "Loamy", "Silty", "Peaty", 
//     "Chalky", "Black Cotton", "Red", "Alluvial"
//   ];

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
//       <div className="text-center mb-6">
//         <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-3">
//           <FaSeedling className="text-green-600 text-2xl" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Soil Test Request</h2>
//         <p className="text-gray-600 mt-1">Schedule a professional soil analysis</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Lab Selection */}
//         <div className="space-y-1">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <FaFlask className="mr-2 text-green-600" />
//             Testing Laboratory
//           </label>
//           <select
//             name="lab"
//             value={formData.lab}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//             required
//             disabled={isSubmitting}
//           >
//             <option value="">Select a laboratory</option>
//             {labs.map((lab) => (
//               <option key={lab.id} value={lab.id}>
//                 {lab.name} - {lab.location}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Soil Type */}
//         <div className="space-y-1">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <FiDroplet className="mr-2 text-green-600" />
//             Soil Type
//           </label>
//           <input
//             type="text"
//             name="soil_type"
//             value={formData.soil_type}
//             onChange={handleChange}
//             placeholder="E.g. Clay, Sandy, Loamy"
//             list="soilTypes"
//             required
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//             disabled={isSubmitting}
//           />
//           <datalist id="soilTypes">
//             {commonSoilTypes.map((type, index) => (
//               <option key={index} value={type} />
//             ))}
//           </datalist>
//         </div>

//         {/* Appointment Date */}
//         <div className="space-y-1">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <FiCalendar className="mr-2 text-green-600" />
//             Appointment Date & Time
//           </label>
//           <input
//             type="datetime-local"
//             name="appointment_date"
//             value={formData.appointment_date}
//             onChange={handleChange}
//             min={new Date().toISOString().slice(0, 16)}
//             required
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//             disabled={isSubmitting}
//           />
//         </div>

//         {/* Additional Notes */}
//         <div className="space-y-1">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <FiClipboard className="mr-2 text-green-600" />
//             Additional Notes
//           </label>
//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             placeholder="Any special instructions or observations..."
//             rows={3}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//             disabled={isSubmitting}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center transition ${
//             isSubmitting
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
//           }`}
//         >
//           {isSubmitting ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting...
//             </>
//           ) : (
//             <>
//               <FiSend className="mr-2" />
//               Submit Request
//             </>
//           )}
//         </button>
//       </form>

//       {/* Help Text */}
//       <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-black-800">
//         <p className="font-medium">ℹ️ Why soil testing is important:</p>
//         <ul className="list-disc pl-5 mt-1 space-y-1">
//           <li>Determines nutrient levels for optimal crop growth</li>
//           <li>Identifies potential soil contaminants</li>
//           <li>Helps in precise fertilizer application</li>
//           <li>Saves money by avoiding unnecessary treatments</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FarmerSoilTestForm;

///--------------------------------------today chatgpt-----------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const FarmerSoilTestForm = ({ farmerId }) => {
//   const [labs, setLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [formData, setFormData] = useState({
//     soil_type: "",
//     appointment_date: "",
//     notes: "",
//   });

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/core/labs/");
//         setLabs(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch labs");
//       }
//     };
//     fetchLabs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedLab) {
//       toast.error("Please select a lab first");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/core/soiltest/create/", {
//         farmer: farmerId,
//         lab: selectedLab.id,
//         soil_type: formData.soil_type,
//         appointment_date: formData.appointment_date,
//         notes: formData.notes
//       });
//       toast.success("Soil test request sent");
//       setFormData({ soil_type: "", appointment_date: "", notes: "" });
//       setSelectedLab(null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to send request");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Lab Selection */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Select a Lab</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {labs.map((lab) => (
//             <div
//               key={lab.id}
//               className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
//                 selectedLab?.id === lab.id ? "border-green-500" : "border-gray-200"
//               }`}
//               onClick={() => setSelectedLab(lab)}
//             >
//               <h4 className="font-bold text-green-700">{lab.name}</h4>
//               <p className="text-sm text-gray-600">{lab.location}</p>
//               <p className="text-sm text-gray-500">📞 {lab.phone_number}</p>
//               <p className="text-sm text-gray-500">✉️ {lab.email}</p>
//             </div>
//           ))}
//         </div>
//         {selectedLab && (
//           <p className="mt-2 text-green-700 font-medium">
//             Selected Lab: {selectedLab.name}
//           </p>
//         )}
//       </div>

//       {/* Request Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Soil Type</label>
//           <input
//             type="text"
//             name="soil_type"
//             value={formData.soil_type}
//             onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Appointment Date</label>
//           <input
//             type="datetime-local"
//             name="appointment_date"
//             value={formData.appointment_date}
//             onChange={(e) =>
//               setFormData({ ...formData, appointment_date: e.target.value })
//             }
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Notes (Optional)</label>
//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Send Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FarmerSoilTestForm;






// -------------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiCalendar, FiClipboard, FiDroplet, FiSend } from "react-icons/fi";
import { FaFlask, FaSeedling } from "react-icons/fa";

const FarmerSoilTestForm = ({ farmerId }) => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    soil_type: "",
    appointment_date: "",
    notes: "",
  });

  // Common soil types for selection
  const soilTypes = [
    { value: "", label: "Select soil type" },
    { value: "Clay", label: "Clay" },
    { value: "Sandy", label: "Sandy" },
    { value: "Loamy", label: "Loamy" },
    { value: "Silty", label: "Silty" },
    { value: "Peaty", label: "Peaty" },
    { value: "Chalky", label: "Chalky" },
    { value: "Black Cotton", label: "Black Cotton" },
    { value: "Red", label: "Red" },
    { value: "Alluvial", label: "Alluvial" },
    { value: "Other", label: "Other (specify in notes)" },
  ];

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/core/labs/");
        setLabs(response.data);
      } catch (error) {
        toast.error("🔴 Failed to load labs. Please try again later.");
        console.error("Error fetching labs:", error);
      }
    };
    
    fetchLabs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLab) {
      toast.error("Please select a lab first");
      return;
    }

    setIsSubmitting(true);
    
    try {
      let appointment_date = formData.appointment_date;
      if (appointment_date.length === 16) appointment_date += ":00";
      
      const payload = {
        ...formData,
        farmer: farmerId,
        lab: selectedLab.id,
        appointment_date,
        status: "Pending"
      };

      await axios.post("http://localhost:8000/core/soiltest/create/", payload);
      
      toast.success("✅ Soil test request submitted successfully!", {
        duration: 4000,
      });
      
      // Reset form
      setFormData({ 
        soil_type: "", 
        appointment_date: "", 
        notes: "" 
      });
      setSelectedLab(null);
      
    } catch (err) {
      let errorMsg = "❌ Failed to submit soil test request";
      
      if (err.response) {
        if (err.response.data?.detail) {
          errorMsg = `❌ ${err.response.data.detail}`;
        } else if (err.response.data) {
          errorMsg = `❌ ${JSON.stringify(err.response.data)}`;
        }
      }
      
      toast.error(errorMsg, { duration: 5000 });
      console.error("Submission error:", err);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-3">
              <FaSeedling className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Soil Test Request</h2>
            <p className="text-gray-600 mt-1">Schedule a professional soil analysis</p>
          </div>

          {/* Lab Selection Section */}
          <div className="mb-8">
            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <FaFlask className="mr-2 text-green-600" />
              Select Testing Laboratory
            </h3>
            
            {labs.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Loading available labs...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {labs.map((lab) => (
                  <div
                    key={lab.id}
                    onClick={() => setSelectedLab(lab)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedLab?.id === lab.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                    }`}
                  >
                    <h4 className="font-bold text-green-700">{lab.name}</h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {lab.location}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {lab.phone_number}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {lab.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedLab && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">
                  Selected: <span className="font-bold">{selectedLab.name}</span>
                </p>
              </div>
            )}
          </div>

          {/* Request Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Soil Type - Now a select field */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiDroplet className="mr-2 text-green-600" />
                Soil Type
              </label>
              <select
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition appearance-none"
                disabled={isSubmitting || !selectedLab}
              >
                {soilTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiCalendar className="mr-2 text-green-600" />
                Appointment Date & Time
              </label>
              <input
                type="datetime-local"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                disabled={isSubmitting || !selectedLab}
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiClipboard className="mr-2 text-green-600" />
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or observations..."
                rows={3}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                disabled={isSubmitting || !selectedLab}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedLab}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center transition ${
                isSubmitting || !selectedLab
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" />
                  {selectedLab ? "Submit Request" : "Please select a lab"}
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-gray-800">
            <p className="font-medium">ℹ️ Why soil testing is important:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Determines nutrient levels for optimal crop growth</li>
              <li>Identifies potential soil contaminants</li>
              <li>Helps in precise fertilizer application</li>
              <li>Saves money by avoiding unnecessary treatments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSoilTestForm;
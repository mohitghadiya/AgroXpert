// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FarmerTestStatus = ({ farmerId }) => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:8000/core/soiltest/farmer/${farmerId}/`)
//       .then((res) => setTests(res.data))
//       .catch(() => setTests([]))
//       .finally(() => setLoading(false));
//   }, [farmerId]);

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">📝 Your Soil Test Requests</h2>
//       {loading ? (
//         <div className="text-center text-gray-500 py-8">Loading...</div>
//       ) : tests.length === 0 ? (
//         <div className="text-center text-gray-500 py-8">No soil test requests found.</div>
//       ) : (
//         <div className="space-y-4">
//           {tests.map((t) => (
//             <div key={t.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border-l-4 border-green-400">
//               <div className="flex flex-wrap gap-4 items-center mb-2">
//                 <span className="font-semibold text-green-700">Lab:</span> {t.lab}
//                 <span className="font-semibold text-blue-700 ml-4">Status:</span>
//                 <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">{t.status}</span>
//               </div>
//               <div><span className="font-semibold">Soil Type:</span> {t.soil_type}</div>
//               <div><span className="font-semibold">Appointment:</span> {new Date(t.appointment_date).toLocaleString()}</div>
//               <div><span className="font-semibold">Notes:</span> {t.notes || "N/A"}</div>
//               {t.result_file_url && (
//                 <a
//                   href={t.result_file_url}
//                   className="mt-2 inline-block text-green-700 underline font-medium"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   📥 Download Report
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmerTestStatus;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload, FiCalendar, FiFileText, FiDroplet, FiClock } from "react-icons/fi";
import { FaFlask, FaSeedling } from "react-icons/fa";
import { toast } from "react-hot-toast";

const FarmerTestStatus = ({ farmerId }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTests = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/core/soiltest/farmer/${farmerId}/`);
      setTests(response.data);
    } catch (error) {
      toast.error("Failed to load test requests");
      console.error("Error fetching tests:", error);
      setTests([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [farmerId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTests();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';  // Green for completed
      case 'accepted':
        return 'bg-blue-100 text-blue-800';    // Blue for accepted
      case 'rejected':
        return 'bg-red-100 text-red-800';    // Gray for rejected
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'; // Yellow for pending
      default:
        return 'bg-gray-100 text-gray-800';    // Default gray
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.toLowerCase() === 'invalid date') {
      return 'Not scheduled';
    }
    try {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) {
      console.error("Date formatting error:", e);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <FaSeedling className="text-green-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Soil Test Requests</h2>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            {refreshing ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-white/80 rounded-xl backdrop-blur-sm">
            <div className="animate-pulse rounded-full bg-gray-200 h-12 w-12"></div>
            <p className="text-gray-500">Loading your test requests...</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12 bg-white/80 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <FaFlask className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No soil test requests found</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't submitted any soil test requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div 
                key={test.id} 
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FaFlask className="text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">{test.lab_name || "Unknown Lab"}</h3>

                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full mt-0.5">
                        <FiDroplet className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Soil Type</p>
                        <p className="font-medium">{test.soil_type || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-full mt-0.5">
                        <FiCalendar className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Appointment</p>
                        <p className="font-medium">{formatDate(test.appointment_date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 p-2 rounded-full mt-0.5">
                        <FiClock className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Request Date</p>
                        <p className="font-medium">{formatDate(test.created_at)}</p>
                      </div>
                    </div>

                    {test.result_file_url && (
                      <div className="flex items-start gap-3">
                        <div className="bg-red-100 p-2 rounded-full mt-0.5">
                          <FiFileText className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Report</p>
                          <a
                            href={test.result_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                          >
                            <FiDownload className="text-sm" />
                            Download Report
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {test.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-full mt-0.5">
                          <FiFileText className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="text-gray-700">{test.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerTestStatus;
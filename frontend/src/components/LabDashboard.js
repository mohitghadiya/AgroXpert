import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUpload, FiCheck, FiX, FiEye, FiClock, FiCalendar, FiDroplet, FiFileText } from "react-icons/fi";
import { FaFlask, FaUserTie } from "react-icons/fa";

const LabDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tests, setTests] = useState([]);
  const [uploading, setUploading] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "Lab") {
      toast.error("Unauthorized access");
      return;
    }

    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/core/soiltest/lab/${user.user_id}/`);
        setTests(res.data);
      } catch (err) {
        console.error("Failed to fetch soil tests", err);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [user?.user_id]);

  const handleStatusUpdate = async (testId, status) => {
    try {
      await axios.post(`http://localhost:8000/core/soiltest/status/${testId}/`, { status });
      toast.success(`Request ${status.toLowerCase()}`);
      const res = await axios.get(`http://localhost:8000/core/soiltest/lab/${user.user_id}/`);
      setTests(res.data);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${status.toLowerCase()} request`);
    }
  };

  const handleFileChange = (testId, value) => {
    setUploading({ ...uploading, [testId]: value });
  };

  const handleUpload = async (testId) => {
    const fileUrl = uploading[testId];
    if (!fileUrl) {
      toast.error("Please enter a valid file URL");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/core/soiltest/upload/${testId}/`, {
        result_file_url: fileUrl,
      });
      toast.success("Result uploaded successfully!");
      const res = await axios.get(`http://localhost:8000/core/soiltest/lab/${user.user_id}/`);
      setTests(res.data);
      setUploading((prev) => ({ ...prev, [testId]: "" }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload result");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    try {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleString('en-US', options);
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaFlask className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Lab Dashboard</h1>
              <p className="text-gray-600">Manage soil test requests and results</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUserTie className="text-blue-500" />
              {tests.length > 0 ? tests[0].lab_name : user?.full_name || "Lab Name"}

            </p>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : tests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <FaFlask className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No soil test requests</h3>
            <p className="mt-1 text-sm text-gray-500">You don't have any soil test requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Test Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <FaFlask className="text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Farmer Name: {test.farmer_name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </div>

                  {/* Test Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <FiCalendar className="text-blue-600" />
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

                    {test.notes && (
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-full mt-0.5">
                          <FiFileText className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="text-gray-700">{test.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    {test.status === "Pending" && (
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleStatusUpdate(test.id, "Accepted")}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FiCheck />
                          Accept Request
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(test.id, "Rejected")}
                          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <FiX />
                          Reject Request
                        </button>
                      </div>
                    )}

                    {test.status === "Accepted" && !test.result_file_url && (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            placeholder="Enter result file URL"
                            value={uploading[test.id] || ""}
                            onChange={(e) => handleFileChange(test.id, e.target.value)}
                            className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          />
                          <button
                            onClick={() => handleUpload(test.id)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FiUpload />
                            Upload Result
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Please provide a publicly accessible URL to the test results</p>
                      </div>
                    )}

                    {test.result_file_url && (
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FiCheck className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Test Result</p>
                          <a
                            href={test.result_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <FiEye />
                            View Test Report
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LabSoilTestList = ({ labId }) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/core/soiltest/lab/${labId}/`)
      .then(res => setRequests(res.data))
      .catch(() => setRequests([]));
  }, [labId]);

  const updateStatus = async (id, status) => {
    try {
      await axios.post(`http://localhost:8000/core/soiltest/status/${id}/`, { status });
      toast.success("Status updated");
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const uploadResult = async (id) => {
    const url = prompt("Enter PDF URL:");
    if (!url) return;
    try {
      await axios.post(`http://localhost:8000/core/soiltest/upload/${id}/`, { result_file_url: url });
      toast.success("Result uploaded");
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, result_file_url: url, status: "Completed" } : r));
    } catch {
      toast.error("Failed to upload result");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">📋 Incoming Soil Test Requests</h2>
      {requests.map(req => (
        <div key={req.id} className="bg-white shadow p-4 mb-4 rounded">
          <p><strong>Farmer:</strong> {req.farmer}</p>
          <p><strong>Soil Type:</strong> {req.soil_type}</p>
          <p><strong>Appointment:</strong> {new Date(req.appointment_date).toLocaleString()}</p>
          <p><strong>Status:</strong> <span className="font-medium text-blue-600">{req.status}</span></p>
          <p><strong>Notes:</strong> {req.notes || "N/A"}</p>
          {req.result_file_url && (
            <a href={req.result_file_url} className="text-green-700 underline" target="_blank" rel="noopener noreferrer">
              Download Report
            </a>
          )}
          {req.status === "Pending" && (
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => updateStatus(req.id, "Accepted")}
              >Accept</button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => updateStatus(req.id, "Rejected")}
              >Reject</button>
            </div>
          )}
          {req.status === "Accepted" && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
              onClick={() => uploadResult(req.id)}
            >Upload Result</button>
          )}
        </div>
      ))}
    </div>
  );
};
export default LabSoilTestList;
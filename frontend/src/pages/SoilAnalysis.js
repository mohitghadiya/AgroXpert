import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FarmerSoilTestForm from '../components/FarmerSoilTestForm';
import FarmerTestStatus from "../components/FarmerTestStatus";
import LabSoilTestList from '../components/LabSoilTestList';

const SoilAnalysis = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.role === "Lab") {
      navigate("/lab-dashboard");
    }
  }, [user, navigate]);

  const [soilData, setSoilData] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    EC: "",
    organicCarbon: "",
    moisture: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSoilData({ ...soilData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendations([]);
    setLoading(true);
    const loadingToast = toast.loading("Analyzing soil health...");
  };

  if (!user) {
    return <p className="text-center mt-10 text-red-600">Please log in to access soil analysis.</p>;
  }

  if (user.role !== 'Farmer' && user.role !== 'Lab') {
    return <p className="text-center mt-10 text-red-600">Unauthorized access.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-green-700 flex items-center justify-center gap-2">
            🧪 Soil Analysis Dashboard <span className="text-base text-gray-500 font-normal">({user.role})</span>
          </h1>
        </header>

        {user.role === 'Farmer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Soil Test Request Form */}
            <section className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <span role="img" aria-label="form">📝</span> Request Soil Test
              </h2>
              <FarmerSoilTestForm farmerId={user.user_id} />
            </section>
            {/* My Soil Test Requests */}
            <section className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <span role="img" aria-label="list">📋</span> My Soil Test Requests
              </h2>
              <FarmerTestStatus farmerId={user.user_id} />
            </section>
            {/* Soil Analysis */}
            <section className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <span role="img" aria-label="lab">🧪</span> Soil Analysis
              </h2>
              {/* Soil Analysis Form */}
              <section className="bg-white rounded-xl shadow p-6 flex flex-col">
  <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
    <span role="img" aria-label="lab">🧪</span> Soil Analysis
  </h2>
  <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
    {[
      { name: "N", label: "Nitrogen (N)", placeholder: "e.g. 60" },
      { name: "P", label: "Phosphorus (P)", placeholder: "e.g. 40" },
      { name: "K", label: "Potassium (K)", placeholder: "e.g. 38" },
      { name: "pH", label: "Soil pH", placeholder: "e.g. 6.2" },
      { name: "EC", label: "Electrical Conductivity (dS/m)", placeholder: "e.g. 0.45" },
      { name: "organicCarbon", label: "Organic Carbon (%)", placeholder: "e.g. 0.75" },
      { name: "moisture", label: "Moisture Content (%)", placeholder: "e.g. 18" },
    ].map(({ name, label, placeholder }) => (
      <div key={name}>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="number"
          name={name}
          value={soilData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
    ))}
    <button
      type="submit"
      className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
      disabled={loading}
    >
      {loading ? "Analyzing..." : "Analyze Soil"}
    </button>
  </form>
  {recommendations.length > 0 && (
    <div className="mt-6 bg-green-50 p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2 text-green-700">Recommendations:</h3>
      <ul className="list-disc pl-6">
        {recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  )}
</section>

            </section>
          </div>
        )}

        {user.role === 'Lab' && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <span role="img" aria-label="lab">🧪</span> Incoming Soil Test Requests
            </h2>
            <LabSoilTestList labId={user.user_id} />
          </section>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;


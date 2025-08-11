import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const FertilizerRecommendation = () => {
  const [form, setForm] = useState({
    Temparature: '',
    Humidity: '',
    Moisture: '',
    Soil_Type: '',
    Crop_Type: '',
    Nitrogen: '',
    Potassium: '',
    Phosphorous: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('fertilizerHistory') || '[]')
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:8000/core/fertilizer/recommend/', form);
      setResult(res.data.recommended_fertilizer);
      toast.success(`🌱 Recommended Fertilizer: ${res.data.recommended_fertilizer}`);
      setHistory(prev => {
        const newHistory = [
          { ...form, fertilizer: res.data.recommended_fertilizer, date: new Date().toLocaleString() },
          ...prev,
        ].slice(0, 10);
        localStorage.setItem('fertilizerHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (err) {
      toast.error('❌ Recommendation failed. Please check your input.');
    }
    setLoading(false);
  };

  // Chart data computation
  const fertilizerCounts = history.reduce((acc, h) => {
    acc[h.fertilizer] = (acc[h.fertilizer] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(fertilizerCounts).map(([name, count]) => ({ name, count }));

  // Emoji mapping for fertilizers
  const fertilizerEmojis = {
    'Urea': '🧪', 'DAP': '🧪', '14-35-14': '🧪', '28-28': '🧪',
    '17-17-17': '🧪', '20-20': '🧪', '10-26-26': '🧪', '23-23-0': '🧪',
    'NPK': '🧪', 'Organic': '🌿', 'Manure': '💩', 'Compost': '🍂',
    'Biofertilizer': '🦠', 'Vermicompost': '🐛', 'Rock Phosphate': '🪨'
  };

  // Color palette for chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Soil and crop types
  const soilTypes = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy'];
  const cropTypes = [
    'rice', 'Wheat', 'Tobacco', 'Sugarcane', 'Pulses', 'pomegranate',
    'Paddy', 'Oil seeds', 'Millets', 'Maize', 'Ground Nuts', 'Cotton',
    'coffee', 'watermelon', 'Barley', 'kidneybeans', 'orange'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-4xl shadow-lg animate-bounce">
              🌾
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-900">AgroXpert Fertilizer Recommendation</h1>
              <p className="text-gray-600 mt-1">Optimal fertilizer suggestions for your crops</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold flex items-center gap-2">
            <span>🔬</span>
            <span>Science-Backed</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-2xl">🌡️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Soil & Environment Data</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Temperature (°C)</span>
                  </label>
                  <input
                    type="number"
                    name="Temparature"
                    value={form.Temparature}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    step="any"
                    placeholder="Enter temperature"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Humidity (%)</span>
                  </label>
                  <input
                    type="number"
                    name="Humidity"
                    value={form.Humidity}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter humidity"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Moisture (%)</span>
                  </label>
                  <input
                    type="number"
                    name="Moisture"
                    value={form.Moisture}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter moisture"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Soil Type</span>
                  </label>
                  <select
                    name="Soil_Type"
                    value={form.Soil_Type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Crop Type</span>
                  </label>
                  <select
                    name="Crop_Type"
                    value={form.Crop_Type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <option value="">Select Crop Type</option>
                    {cropTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Nitrogen (N) Level</span>
                  </label>
                  <input
                    type="number"
                    name="Nitrogen"
                    value={form.Nitrogen}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter nitrogen level"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Phosphorous (P) Level</span>
                  </label>
                  <input
                    type="number"
                    name="Phosphorous"
                    value={form.Phosphorous}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter phosphorous level"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700">
                    <span>Potassium (K) Level</span>
                  </label>
                  <input
                    type="number"
                    name="Potassium"
                    value={form.Potassium}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter potassium level"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  loading ? 'bg-gray-400' : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Get Recommendation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-2xl">🧪</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recommendation</h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-green-200">
              {result ? (
                <div className="text-center animate-fade-in">
                  <div className="text-6xl mb-4">{fertilizerEmojis[result] || '🧪'}</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Recommended Fertilizer</h3>
                  <div className="bg-white p-4 rounded-lg shadow-inner border border-green-200">
                    <p className="text-3xl font-bold text-green-700">{result}</p>
                  </div>
                  <p className="text-gray-600 mt-4">Best suited for your crop and soil conditions</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">👨‍🌾</div>
                  <h3 className="text-xl font-semibold mb-2">No recommendation yet</h3>
                  <p>Fill in the parameters and click "Get Recommendation"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History and Charts Section */}
        {(history.length > 0 || chartData.length > 0) && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* History Table */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <span className="text-2xl">📜</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Recent Recommendations</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-3 text-left rounded-tl-lg">Date</th>
                        <th className="p-3 text-left">Fertilizer</th>
                        <th className="p-3 text-left">Crop</th>
                        <th className="p-3 text-left rounded-tr-lg">Soil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 5).map((item, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3">{item.date}</td>
                          <td className="p-3 font-semibold text-green-700 flex items-center gap-2">
                            {fertilizerEmojis[item.fertilizer] || '🧪'} {item.fertilizer}
                          </td>
                          <td className="p-3">{item.Crop_Type}</td>
                          <td className="p-3">{item.Soil_Type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Chart Section */}
            {chartData.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Recommendation Trends</h2>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        formatter={(value) => [`${value} recommendations`, '']}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

        <ToastContainer 
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';

const CropRecommend = () => {
  const [form, setForm] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('cropHistory') || '[]')
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:8000/core/crop/recommend/', form);
      setResult(res.data.recommended_crop);
      toast.success(`🌱 Recommended Crop: ${res.data.recommended_crop}`);
      setHistory(prev => {
        const newHistory = [
          { ...form, crop: res.data.recommended_crop, date: new Date().toLocaleString() },
          ...prev,
        ].slice(0, 10);
        localStorage.setItem('cropHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (err) {
      toast.error('❌ Prediction failed. Please check your input.');
    }
    setLoading(false);
  };

  // Chart data computation
  const cropCounts = history.reduce((acc, h) => {
    acc[h.crop] = (acc[h.crop] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(cropCounts).map(([name, count]) => ({ name, count }));

  // Emoji mapping for crops
  const cropEmojis = {
    'rice': '🍚', 'maize': '🌽', 'chickpea': '🥜', 'kidneybeans': '🫘',
    'pigeonpeas': '🫘', 'mothbeans': '🫘', 'mungbean': '🫘', 'blackgram': '🫘',
    'lentil': '🫘', 'pomegranate': '🍅', 'banana': '🍌', 'mango': '🥭',
    'grapes': '🍇', 'watermelon': '🍉', 'muskmelon': '🍈', 'apple': '🍏',
    'orange': '🍊', 'papaya': '🍈', 'coconut': '🥥', 'cotton': '🧶',
    'jute': '🧵', 'coffee': '☕'
  };

  // Color palette for chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-green-100 text-green-700 p-3 rounded-full text-4xl shadow-lg animate-bounce">
              🌱
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-900">AgroXpert Crop Recommendation</h1>
              <p className="text-gray-600 mt-1">Smart farming solutions powered by machine learning</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold flex items-center gap-2">
            <span>🤖</span>
            <span>AI-Powered</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Input Parameters</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { field: 'N', label: 'Nitrogen (N)' },
                  { field: 'P', label: 'Phosphorus (P)' },
                  { field: 'K', label: 'Potassium (K)' },
                  { field: 'temperature', label: 'Temperature (°C)' },
                  { field: 'humidity', label: 'Humidity (%)' },
                  { field: 'ph', label: 'pH Level' },
                  { field: 'rainfall', label: 'Rainfall (mm)' },
                ].map(({ field, label, emoji }) => (
                  <div key={field} className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-gray-700">
                      <span className="text-xl">{emoji}</span>
                      <span>{label}</span>
                    </label>
                    <input
                      type="number"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      step="any"
                      min="0"
                      placeholder={`Enter ${label.split(' ')[0]}`}
                    />
                  </div>
                ))}
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
                    <span className="text-xl">🔍</span>
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
                <span className="text-2xl">🌾</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recommendation</h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-green-200">
              {result ? (
                <div className="text-center animate-fade-in">
                  <div className="text-6xl mb-4">{cropEmojis[result.toLowerCase()] || '🌱'}</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Recommended Crop</h3>
                  <div className="bg-white p-4 rounded-lg shadow-inner border border-green-200">
                    <p className="text-3xl font-bold text-green-700">{result}</p>
                  </div>
                  <p className="text-gray-600 mt-4">Best suited for your soil and climate conditions</p>
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
                        <th className="p-3 text-left">Crop</th>
                        <th className="p-3 text-left">N</th>
                        <th className="p-3 text-left">P</th>
                        <th className="p-3 text-left rounded-tr-lg">K</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 5).map((item, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3">{item.date}</td>
                          <td className="p-3 font-semibold text-green-700 flex items-center gap-2">
                            {cropEmojis[item.crop.toLowerCase()] || '🌱'} {item.crop}
                          </td>
                          <td className="p-3">{item.N}</td>
                          <td className="p-3">{item.P}</td>
                          <td className="p-3">{item.K}</td>
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

export default CropRecommend;
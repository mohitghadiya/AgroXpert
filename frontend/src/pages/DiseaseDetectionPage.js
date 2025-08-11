import React, { useState, useCallback } from 'react';
import axios from 'axios';

// SVG Components
const UploadIcon = () => (
  <svg className="w-16 h-16 mx-auto text-gray-400 animate-pulse" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DiseaseDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = useCallback((file) => {
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024;
    
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG or PNG image');
      return;
    }
    
    if (file.size > maxSize) {
      setError('Image size must be less than 10MB');
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError('');
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  }, [handleImageChange]);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/core/predict/disease/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });
      
      if (response.data && typeof response.data.is_healthy !== 'undefined') {
        setResult(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMsg = 'Analysis failed. Please try another image.';
      setError(errorMsg);
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto transition-all duration-300 hover:scale-[1.005]">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
          <div className="p-6 sm:p-8 md:p-10">
            <header className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 animate-slide-up">
                🌱 Leaf Detection
              </h1>
              <p className="text-gray-600 text-lg animate-slide-up delay-100">
                Upload an image to know plant name
              </p>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in delay-200">
                <div 
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`mt-2 flex justify-center px-6 pt-8 pb-10 border-2 ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'} border-dashed rounded-xl transition-all duration-300`}
                >
                  <div className="space-y-3 text-center">
                    <UploadIcon />
                    <div className="flex flex-col sm:flex-row text-sm text-gray-600 justify-center items-center">
                      <label 
                        htmlFor="file-upload" 
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-4 py-2 border border-green-300 hover:border-green-400 transition-colors"
                      >
                        <span>Choose a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/jpeg, image/png" 
                          onChange={handleFileInputChange} 
                        />
                      </label>
                      <p className="mt-2 sm:mt-0 sm:ml-2">or drag and drop here</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {preview && (
                <div className="mt-6 text-center animate-fade-in">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Image Preview</h3>
                  <div className="inline-block relative group">
                    <img 
                      src={preview} 
                      alt="Selected preview" 
                      className="max-h-64 max-w-full rounded-lg shadow-md border border-gray-200 transition-transform duration-300 group-hover:scale-102" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview('');
                        setImage(null);
                        URL.revokeObjectURL(preview);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                      aria-label="Remove image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="animate-fade-in delay-300">
                <button 
                  type="submit" 
                  disabled={!image || isLoading}
                  className={`w-full px-6 py-4 font-semibold text-white rounded-xl shadow-lg ${
                    isLoading ? 'bg-green-700' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  } disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Analyzing...</span>
                    </>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      Detect Leaf
                    </span>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 text-center text-sm text-red-800 bg-red-100 rounded-lg flex justify-between items-center animate-fade-in">
                <span>{error}</span>
                <button
                  onClick={() => setError('')}
                  className="text-red-600 hover:text-red-800 font-bold text-lg"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            {result && (
              <div className="mt-8 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white animate-slide-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analysis Result
                </h2>
                
                <div className="space-y-4">
                  
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                      <span className="text-sm font-medium text-gray-500 block mb-1">Plant Name</span>
                      <span className="font-bold text-gray-800 text-lg capitalize">{result.plant_name}</span>
                    </div>
                    
                    
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Confidence Level</span>
                      <span className="text-sm font-bold text-gray-800">{(result.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          result.is_healthy ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiseaseDetectionPage;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toolsApi } from "../../services/api";
import { Plus, CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function ToolSubmission() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      setSubmitStatus({ type: 'loading', message: 'Submitting tool...' });
      await toolsApi.createTool(data);
      setSubmitStatus({ type: 'success', message: 'Tool submitted successfully!' });
      reset();
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.detail || 'Failed to submit tool. Please try again.' 
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a New Tool</h1>
        <p className="text-gray-600">Add your AI tool to the marketplace</p>
      </div>

      {/* Status Message */}
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
          submitStatus.type === 'success' ? 'bg-green-50 text-green-800' :
          submitStatus.type === 'error' ? 'bg-red-50 text-red-800' :
          'bg-blue-50 text-blue-800'
        }`}>
          {submitStatus.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {submitStatus.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {submitStatus.type === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
          <span className="font-medium">{submitStatus.message}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tool Name *
              </label>
              <input
                {...register("name", { required: "Tool name is required" })}
                className={`input ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="Enter tool name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className={`input ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="Describe what your tool does..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className={`input ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select category</option>
                  <option value="Math">Math</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Weather">Weather</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className={`input ${errors.region ? 'border-red-300 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select region</option>
                  <option value="Global">Global</option>
                  <option value="US">US</option>
                  <option value="India">India</option>
                  <option value="EU">EU</option>
                  <option value="Other">Other</option>
                </select>
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Configuration */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Endpoint URL *
              </label>
              <input
                {...register("endpoint", { required: "Endpoint URL is required" })}
                className={`input ${errors.endpoint ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="http://localhost:8000/mcp or python script.py"
              />
              {errors.endpoint && (
                <p className="mt-1 text-sm text-red-600">{errors.endpoint.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type *
                </label>
                <select
                  {...register("transport", { required: "Transport type is required" })}
                  className={`input ${errors.transport ? 'border-red-300 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select transport</option>
                  <option value="stdio">stdio</option>
                  <option value="streamable_http">streamable_http</option>
                </select>
                {errors.transport && (
                  <p className="mt-1 text-sm text-red-600">{errors.transport.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Used (optional)
                </label>
                <input
                  {...register("model")}
                  className="input"
                  placeholder="e.g., gemma3:4b, llama2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Configuration (JSON)
              </label>
              <textarea
                {...register("config")}
                rows={3}
                className="input font-mono text-sm"
                placeholder='{"key": "value"}'
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional JSON configuration for advanced settings
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Submit Tool
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 
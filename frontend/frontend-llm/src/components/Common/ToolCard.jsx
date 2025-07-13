import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Eye, Clock, Globe, Zap } from "lucide-react";

export default function ToolCard({ tool }) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'math':
        return '🧮';
      case 'healthcare':
        return '🏥';
      case 'weather':
        return '🌤️';
      case 'finance':
        return '💰';
      default:
        return '🔧';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'badge-green' : 'badge-red';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`card p-6 transition-all duration-200 ${isHovered ? 'transform -translate-y-1 shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getCategoryIcon(tool.category)}</div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{tool.name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(tool.created_at)}
            </p>
          </div>
        </div>
        <span className={`badge ${getStatusColor(tool.status)}`}>
          {tool.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge badge-blue">
          <Globe className="w-3 h-3 mr-1" />
          {tool.category}
        </span>
        <span className="badge badge-gray">
          {tool.region}
        </span>
        {tool.model && (
          <span className="badge badge-blue">
            <Zap className="w-3 h-3 mr-1" />
            {tool.model}
          </span>
        )}
      </div>

      {/* Transport Info */}
      <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded">
        <span className="font-medium">Transport:</span> {tool.transport}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Link 
          to={`/chat?tool=${tool.id}`}
          className="btn-primary flex items-center justify-center flex-1"
        >
          <Play className="w-4 h-4 mr-1" />
          Test Tool
        </Link>
        <button className="btn-secondary flex items-center justify-center">
          <Eye className="w-4 h-4 mr-1" />
          Details
        </button>
      </div>
    </div>
  );
} 
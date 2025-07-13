import React, { useEffect, useState } from "react";
import { toolsApi } from "../../services/api";
import ToolCard from "../Common/ToolCard";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Search, Filter, Grid, List } from "lucide-react";

export default function Marketplace() {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["All", "Math", "Healthcare", "Weather", "Finance", "Other"];
  const statuses = ["All", "active", "inactive"];

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await toolsApi.getTools();
        setTools(res.data);
        setFilteredTools(res.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => {
    let filtered = tools;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus && selectedStatus !== "All") {
      filtered = filtered.filter(tool => tool.status === selectedStatus);
    }

    setFilteredTools(filtered);
  }, [tools, searchTerm, selectedCategory, selectedStatus]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover and test AI tools</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-40"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input w-32"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredTools.length} of {tools.length} tools
        </p>
        {filteredTools.length > 0 && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSelectedStatus("");
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Tools Grid/List */}
      {filteredTools.length > 0 ? (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSelectedStatus("");
            }}
            className="btn-primary"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
} 
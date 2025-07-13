import React, { useEffect, useState } from "react";
import { toolsApi } from "../../services/api";
import { TrendingUp, Package, CheckCircle, AlertCircle, Clock, Activity, Plus, MessageCircle } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentTools, setRecentTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await toolsApi.getTools();
        const tools = res.data;
        setRecentTools(tools.slice(-5).reverse());
        setStats({
          total: tools.length,
          active: tools.filter(t => t.status === "active").length,
          categories: [...new Set(tools.map(t => t.category))].length,
          inactive: tools.filter(t => t.status === "inactive").length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Tools",
      value: stats.total || 0,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Tools",
      value: stats.active || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Categories",
      value: stats.categories || 0,
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Inactive Tools",
      value: stats.inactive || 0,
      icon: AlertCircle,
      color: "bg-red-500",
      change: "-3%",
      changeType: "negative"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to AI Tools Marketplace</h1>
        <p className="text-gray-600">Manage and discover powerful AI tools for your projects</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tools */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Tools
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        {recentTools.length > 0 ? (
          <div className="space-y-4">
            {recentTools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.category} • {tool.region}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`badge ${tool.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                    {tool.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tools added yet</p>
            <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add your first tool
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200">
            <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Add New Tool</p>
            <p className="text-xs text-gray-500">Submit a new AI tool</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200">
            <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Browse Tools</p>
            <p className="text-xs text-gray-500">Explore the marketplace</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200">
            <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Test Tools</p>
            <p className="text-xs text-gray-500">Chat with AI tools</p>
          </button>
        </div>
      </div>
    </div>
  );
} 
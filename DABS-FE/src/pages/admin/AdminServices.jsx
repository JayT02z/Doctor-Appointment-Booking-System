import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Plus, Edit2, Power, Loader2 } from 'lucide-react';

const AdminServices = () => {
    const { token } = useAuth();
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", price: "", isActive: true });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/services/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setServices(response.data.data || []);
        } catch (error) {
            toast.error("Failed to fetch services");
            setServices([]);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                await axios.put(`http://localhost:8080/api/services/update/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Service updated successfully");
            } else {
                await axios.post("http://localhost:8080/api/services/create", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Service created successfully");
            }
            setForm({ name: "", description: "", price: "", isActive: true });
            setEditingId(null);
            fetchServices();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (service) => {
        setForm({
            name: service.name,
            description: service.description,
            price: service.price,
            isActive: service.isActive,
        });
        setEditingId(service.id);
    };

    const handleToggleStatus = async (service) => {
        const action = service.isActive ? "deactivate" : "activate";
        if (!window.confirm(`Are you sure you want to ${action} this service?`)) return;
        try {
            await axios.put(
                `http://localhost:8080/api/services/update/${service.id}`,
                { ...service, isActive: !service.isActive },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success(`Service ${action}d`);
            fetchServices();
        } catch {
            toast.error(`Failed to ${action} service`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Plus className="w-6 h-6 text-[#00B5F1]" />
                        {editingId ? "Edit Service" : "Add New Service"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Service Name</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1] transition-colors duration-200"
                                    placeholder="Enter service name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price (VND)</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1] transition-colors duration-200"
                                    type="number"
                                    placeholder="Enter price"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1] transition-colors duration-200"
                                    placeholder="Enter service description"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows="3"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                    className="w-4 h-4 text-[#00B5F1] border-gray-300 rounded focus:ring-[#00B5F1]"
                                />
                                <span className="text-sm font-medium text-gray-700">Active Service</span>
                            </label>
                            <div className="flex gap-3">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForm({ name: "", description: "", price: "", isActive: true });
                                            setEditingId(null);
                                        }}
                                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#00B5F1] text-white hover:bg-[#0095c8] transition-colors duration-200 disabled:opacity-50"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingId ? "Update" : "Add"} Service
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Services</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Price</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {services.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{s.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{s.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                                            {Number(s.price).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                s.isActive 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {s.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(s)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-[#00B5F1] hover:bg-[#00B5F1]/10 transition-colors duration-200"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(s)}
                                                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                        s.isActive 
                                                            ? "text-red-600 hover:bg-red-50" 
                                                            : "text-green-600 hover:bg-green-50"
                                                    }`}
                                                >
                                                    <Power className="w-4 h-4" />
                                                    {s.isActive ? "Deactivate" : "Activate"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <p className="text-gray-500 text-sm">No services found</p>
                                            <p className="text-gray-400 text-xs mt-1">Add a new service to get started</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminServices;


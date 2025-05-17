import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminServices = () => {
    const { token } = useAuth();
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", price: "", isActive: true });
    const [editingId, setEditingId] = useState(null);

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
        try {
            if (editingId) {
                await axios.put(`http://localhost:8080/api/services/update/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Service updated");
            } else {
                await axios.post("http://localhost:8080/api/services/create", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Service created");
            }
            setForm({ name: "", description: "", price: "", isActive: true });
            setEditingId(null);
            fetchServices();
        } catch (err) {
            toast.error("Operation failed");
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
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Service" : "Add New Service"}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="border rounded-lg p-2"
                        placeholder="Service Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="border rounded-lg p-2"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <input
                        className="border rounded-lg p-2"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                        />
                        <span>Active</span>
                    </label>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {editingId ? "Update" : "Add"} Service
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">All Services</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300 shadow rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
                        <tr>
                            <th className="p-3 border text-center">Name</th>
                            <th className="p-3 border text-center">Description</th>
                            <th className="p-3 border text-center">Price</th>
                            <th className="p-3 border text-center">Status</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                        {services.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition duration-200">
                                <td className="p-3 border text-center">{s.name}</td>
                                <td className="p-3 border text-left">{s.description}</td>
                                <td className="p-3 border text-center">
                                    {Number(s.price).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </td>
                                <td className="p-3 border text-center">
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                        s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                >
                    {s.isActive ? "Active" : "Inactive"}
                </span>
                                </td>
                                <td className="p-3 border text-center">
                                    <div className="flex justify-center gap-2 flex-wrap md:flex-nowrap">
                                        <button
                                            onClick={() => handleEdit(s)}
                                            className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(s)}
                                            className={`px-3 py-1 text-sm rounded text-white transition ${
                                                s.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                            }`}
                                        >
                                            {s.isActive ? "Deactivate" : "Activate"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {services.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No services found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminServices;

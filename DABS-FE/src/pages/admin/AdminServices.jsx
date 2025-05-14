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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Service deleted");
            fetchServices();
        } catch {
            toast.error("Delete failed");
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
                    <table className="min-w-full table-auto border">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border text-center">Name</th>
                            <th className="p-2 border text-center">Description</th>
                            <th className="p-2 border text-center">Price</th>
                            <th className="p-2 border text-center">Status</th>
                            <th className="p-2 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50">
                                <td className="p-2 border text-center">{s.name}</td>
                                <td className="p-2 border text-center">{s.description}</td>
                                <td className="p-2 border text-center">
                                    {Number(s.price).toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                                </td>
                                <td className="p-2 border text-center">{s.isActive ? "Active" : "Inactive"}</td>
                                <td className="p-2 border text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(s)}
                                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDoctor } from "../../context/DoctorContext";
import { toast } from "react-hot-toast";

const DoctorServices = () => {
    const { doctorId } = useDoctor();
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/services/all")
            .then(res => {
                if (res.data.statusCode === 200 && Array.isArray(res.data.data)) {
                    setServices(res.data.data);
                } else {
                    toast.error("Unexpected response format");
                }
            })
            .catch(() => toast.error("Failed to load services"));
    }, []);

    const toggleService = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8080/api/services/doctor/addservice", {
                doctorId,
                services: selected
            });
            toast.success("Services updated successfully");
        } catch {
            toast.error("Failed to update services");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Choose Services You Provide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map(service => (
                    <div
                        key={service.id}
                        className={`p-4 rounded border shadow hover:shadow-md transition cursor-pointer ${selected.includes(service.id) ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
                        onClick={() => toggleService(service.id)}
                    >
                        <h4 className="font-semibold text-lg mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-right">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
                >
                    Save Services
                </button>
            </div>
        </div>
    );
};

export default DoctorServices;
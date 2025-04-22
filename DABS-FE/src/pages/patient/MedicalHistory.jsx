import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const MedicalHistory = () => {
  const { user, token } = useAuth();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/patients/${user.id}/medical-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        setMedicalHistory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching medical history:", error);
      toast.error("Failed to fetch medical history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Print History
          </button>
        </div>

        {medicalHistory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No medical history available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {medicalHistory.map((record, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      record.type === "DIAGNOSIS"
                        ? "bg-blue-100 text-blue-800"
                        : record.type === "TREATMENT"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {record.type}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">{record.description}</p>
                </div>
                {record.attachments && record.attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Attachments:
                    </h4>
                    <div className="flex space-x-2">
                      {record.attachments.map((attachment, idx) => (
                        <a
                          key={idx}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          {attachment.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;

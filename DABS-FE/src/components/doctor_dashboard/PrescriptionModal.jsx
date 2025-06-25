import React from 'react';
import Modal from 'react-modal';
import { Plus, X, Send, FileText, Clock, Pill, CalendarClock } from 'lucide-react';

Modal.setAppElement('#root');

const PrescriptionModal = ({
    isOpen,
    onClose,
    prescriptionData,
    setPrescriptionData,
    onCreate,
    onSend,
    createdId,
    isSending
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl outline-none border-t-4 border-[#00B5F1]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-[#00B5F1]" />
                    <h2 className="text-2xl font-bold text-gray-900">New Prescription</h2>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-[#00B5F1] transition-colors duration-200 focus:outline-none rounded-full p-1 hover:bg-gray-100"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Pill className="h-4 w-4 text-[#00B5F1]" />
                            Dosage
                        </label>
                        <input
                            type="number"
                            value={prescriptionData.dosage}
                            onChange={(e) => setPrescriptionData(p => ({ ...p, dosage: parseInt(e.target.value) }))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-20 transition-colors duration-200"
                            min="1"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Clock className="h-4 w-4 text-[#00B5F1]" />
                            Duration (days)
                        </label>
                        <input
                            type="number"
                            value={prescriptionData.duration}
                            onChange={(e) => setPrescriptionData(p => ({ ...p, duration: parseInt(e.target.value) }))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-20 transition-colors duration-200"
                            min="1"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CalendarClock className="h-4 w-4 text-[#00B5F1]" />
                        Frequency
                    </label>
                    <select
                        value={prescriptionData.frequency}
                        onChange={(e) => setPrescriptionData(p => ({ ...p, frequency: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-20 transition-colors duration-200 bg-white"
                    >
                        <option value="ONCE">Once a day</option>
                        <option value="TWICE">Twice a day</option>
                        <option value="THREE_TIMES">Three times a day</option>
                        <option value="FOUR_TIMES">Four times a day</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4 text-[#00B5F1]" />
                        Description
                    </label>
                    <textarea
                        value={prescriptionData.description}
                        onChange={(e) => setPrescriptionData(p => ({ ...p, description: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-20 transition-colors duration-200 min-h-[100px] resize-y"
                        placeholder="Enter prescription details and instructions..."
                    />
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Pill className="h-4 w-4 text-[#00B5F1]" />
                        Medicines
                    </label>
                    <div className="space-y-2">
                        {prescriptionData.medicineIds.map((m, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={m}
                                    onChange={(e) => {
                                        const ids = [...prescriptionData.medicineIds];
                                        ids[i] = e.target.value;
                                        setPrescriptionData(p => ({ ...p, medicineIds: ids }));
                                    }}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-20 transition-colors duration-200"
                                    placeholder="Enter medicine name"
                                />
                                <button
                                    onClick={() => {
                                        const ids = [...prescriptionData.medicineIds];
                                        ids.splice(i, 1);
                                        setPrescriptionData(p => ({ ...p, medicineIds: ids }));
                                    }}
                                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setPrescriptionData(p => ({ ...p, medicineIds: [...p.medicineIds, ""] }))}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#00B5F1] bg-[#00B5F1]/10 rounded-lg hover:bg-[#00B5F1]/20 transition-colors duration-200"
                    >
                        <Plus className="h-4 w-4" />
                        Add Medicine
                    </button>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button
                    onClick={onCreate}
                    className="px-6 py-2.5 bg-[#00B5F1] text-white rounded-lg hover:bg-[#009cd3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-50 font-medium"
                >
                    Create Prescription
                </button>
                {createdId && (
                    <button
                        onClick={onSend}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSending}
                    >
                        <Send className="h-4 w-4" />
                        {isSending ? 'Sending...' : 'Send to Patient'}
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default PrescriptionModal;
